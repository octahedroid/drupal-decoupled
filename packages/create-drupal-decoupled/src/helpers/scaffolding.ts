import fs from "node:fs";
import path from "node:path";
import type { SupportedFrontend } from "src/constants";
import {
  DrupalAuthFile,
  DrupalClientFile,
  EnvFile,
  TailwindCSSFile,
} from "./files/shared";

const SCAFFOLD_FILES_PER_FRONTEND: Readonly<ScaffoldFilesPerFrontend> = {
  remix: {
    files: [
      DrupalClientFile,
      DrupalAuthFile,
      EnvFile,
      {
        ...EnvFile,
        rename: ".env",
        operation: "update",
      },
      {
        targetPath: "app",
        sourcePath: "remix-graphql",
        fileName: "tailwind.css",
        operation: "update",
      },
      {
        targetPath: "app/utils",
        sourcePath: "remix-graphql",
        fileName: "calculate-path.server.ts",
        operation: "create",
      },
      {
        targetPath: "app/routes",
        sourcePath: "remix-graphql",
        fileName: "$.tsx",
        operation: "create",
      },
      {
        targetPath: "app/routes",
        sourcePath: "remix-graphql",
        fileName: "$.tsx",
        rename: "_index.tsx",
        operation: "update",
      },
    ],
  },
  next: {
    files: [
      {
        ...DrupalClientFile,
        targetPath: "/utils",
        rename: "client.ts",
        sanitize: (fileContent: string) =>
          fileContent.replace(
            "import { getToken } from './auth.server'",
            "import { getToken } from './auth'",
          ),
      },
      {
        ...DrupalAuthFile,
        targetPath: "/utils",
        rename: "auth.ts",
      },
      {
        ...TailwindCSSFile,
        rename: "globals.css",
      },
      EnvFile,
      {
        ...EnvFile,
        rename: ".env.local",
        operation: "update",
      },
      {
        targetPath: "utils",
        sourcePath: "next-graphql",
        fileName: "calculate-path.ts",
        operation: "create",
      },
      {
        targetPath: "app/[[...slug]]",
        sourcePath: "next-graphql",
        fileName: "page.tsx",
        operation: "create",
      },
      {
        operation: "delete",
        targetPath: "app",
        fileName: "page.tsx",
      },
    ],
  },
  "react-router": {
    files: [
      DrupalClientFile,
      DrupalAuthFile,
      EnvFile,
      {
        ...EnvFile,
        rename: ".env",
        operation: "update",
      },
      {
        ...TailwindCSSFile,
        rename: "app.css",
        operation: "update",
      },
      {
        targetPath: "app/utils",
        sourcePath: "shared",
        fileName: "metatags.ts",
        operation: "create",
      },
      {
        targetPath: "app",
        sourcePath: "react-router-graphql",
        fileName: "routes.ts",
        operation: "update",
      },
      {
        targetPath: "app/routes",
        sourcePath: "react-router-graphql",
        fileName: "$.tsx",
        operation: "create",
      },
      {
        targetPath: "app/routes",
        fileName: "home.tsx",
        operation: "delete",
      },
      {
        targetPath: "app/utils",
        sourcePath: "react-router-graphql",
        fileName: "calculatePath.ts",
        rename: "routes.ts",
        operation: "create",
      },
    ],
  },
};

export function isJavascriptProject(projectPath: string) {
  return fs.existsSync(path.join(projectPath, "package.json"));
}

// Validate if the project
export function isValidFramework(
  projectPath: string,
  frontend: SupportedFrontend,
) {
  const packageJsonPath = path.join(projectPath, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  if (frontend === "next") {
    return Boolean(dependencies["next"]);
  }

  if (frontend === "remix") {
    return Boolean(devDependencies["@remix-run/dev"]);
  }

  if (frontend === "react-router") {
    return Boolean(devDependencies["@react-router/dev"]);
  }

  return false;
}

export function updateGitignore(
  frontend: SupportedFrontend,
  projectPath: string,
) {
  const gitignorePath = path.join(projectPath, ".gitignore");
  const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
  const envFileName = frontend === "next" ? ".env*" : ".env";

  if (!gitignoreContent.includes(envFileName)) {
    fs.appendFileSync(gitignorePath, `\n${envFileName}\n`);
  }
}

export function scaffoldFrontend(
  frontend: SupportedFrontend,
  projectPath: string,
) {
  const frontendFiles = SCAFFOLD_FILES_PER_FRONTEND[frontend].files;

  return frontendFiles.map((config) => {
    const { operation, fileName, targetPath } = config;

    if (operation === "delete") {
      const filePath = path.join(projectPath, targetPath, fileName);
      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
      return `Deleted ${targetPath === "." ? "" : `${targetPath}/`}${fileName}`;
    }
    const { sourcePath, rename, sanitize } = config;
    const name = rename || fileName;

    const templatePath = path.join(
      __dirname,
      "templates",
      sourcePath,
      fileName,
    );
    const destinationPath = path.join(
      process.cwd(),
      projectPath,
      targetPath,
      name,
    );
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });

    let fileContent = fs.readFileSync(templatePath, "utf-8");

    if (sanitize) {
      fileContent = sanitize(fileContent);
    }

    fs.writeFileSync(destinationPath, fileContent);

    const message = operation === "update" ? "Updated" : "Created";
    return `${message} ${targetPath === "." ? "" : `${targetPath}/`}${name}`;
  });
}
