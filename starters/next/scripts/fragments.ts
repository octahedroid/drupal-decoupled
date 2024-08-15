import path from "path";
import * as dotenv from "dotenv";
import fs from "fs";
import { graphql } from "@/graphql/gql.tada";
import { getClient } from "@/utils/client.server";

(async () => {

  const envPath = path.join(process.cwd(), ".env");
  dotenv.config({ path: envPath });

  const client = await getClient({
    url: process.env.DRUPAL_GRAPHQL_URI!,
    auth: {
      uri: process.env.DRUPAL_AUTH_URI!,
      clientId: process.env.DRUPAL_CLIENT_ID!,
      clientSecret: process.env.DRUPAL_CLIENT_SECRET!,
    }
  })

  const query = graphql(`query fragments {
    info {
      fragments {
        __typename
        type
        name
        class
        content
        entity
        bundle
        dependencies 
      }
    }
  }`);

  const { data, error } = await client.query(query, {});

  if (error) {
    throw error;
  }

  if (!data || !data.info || !data.info.fragments) {
    throw new Error("No fragments found");
  }

  interface Fragment {
    name: string;
    content: string;
    dependencies: string[];
  }
  const fragments = new Map<string, Fragment[]>();
  const fragmentNameMapping = new Map<string, string>();

  data.info.fragments.forEach((fragment) => {
    if (fragment.name.includes("Unsupported")) {
      return;
    }

    if (!fragment.content) {
      return;
    }

    const fileName = 'gql';
    const fragmentRenaming = new Map<string, string>();
    fragment.dependencies?.forEach((dependency: string | null) => {
      if (!dependency) {
        return;
      }
      fragmentRenaming.set(dependency, `${dependency.replace('Fragment', '')}Fragment`);
    });
    const fragmentName = `${fragment.name.replace('Fragment', '')}Fragment`;
    let content = fragment.content
      .replace(`fragment ${fragment.name}`, `fragment ${fragmentName}`)
      .replaceAll('... ', '...');
    const dependencies = [] as string[];
    fragmentRenaming.forEach((value, key) => {
      content = content.replaceAll(key, value);
      dependencies.push(value);
    });

    if (!fragmentNameMapping.has(fragmentName)) {
      fragmentNameMapping.set(fragmentName, fileName);
    }

    const currentFragments = fragments.has(fileName) ? fragments.get(fileName) ?? [] : [];
    currentFragments.push({
      name: fragmentName,
      content,
      dependencies,
    });
    fragments.set(fileName, currentFragments);
  });

  const fragmentPath = path.join(process.cwd(), "graphql", "fragments", "generated");
  if (!fs.existsSync(fragmentPath)) {
    fs.mkdirSync(fragmentPath, { recursive: true });
  }
  fragments.forEach((_value, key) => {
    const fragment = fragments.get(key);
    if (!fragment) {
      return;
    }
    const fragmentFile = path.join(fragmentPath, `${key}.ts`);
    const content = fragment.map((f) => {
      const fragmentDependencies = [] as string[];

      f.dependencies.forEach((d) => {
        if (!fragmentNameMapping.has(d)) {
          return;
        }

        fragmentDependencies.push(`${d},`);
      });

      const fragmentDefinition = `export const ${f.name} = graphql(\`${f.content}\`)\n`;
      if (fragmentDependencies.length === 0) {
        return fragmentDefinition;
      }

      return fragmentDefinition.replace(")", `,
  [
    ${fragmentDependencies.join("\n    ")}
  ]
)`);
    }).join("\n");

    const header = '// These fragments are intended as a guide, not a solution.\n' + 
                    '// Use them to quickly get started building your application.\n\n' +
                    'import { graphql } from "@/graphql/gql.tada";\n';

    fs.writeFileSync(fragmentFile, `${header}\n${content}`);
  });

})();
