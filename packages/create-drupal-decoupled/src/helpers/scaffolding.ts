import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { getAdapter, isSupportedFrontend } from "../frameworks";
import type { FrameworkAdapter } from "../frameworks/types";

export function isJavascriptProject(projectPath: string) {
  return fs.existsSync(path.join(projectPath, "package.json"));
}

export function isValidFramework(
  projectPath: string,
  frontend: string,
): boolean {
  if (!isSupportedFrontend(frontend)) {
    return false;
  }

  const adapter = getAdapter(frontend);

  const packageJsonPath = path.join(projectPath, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  const dependencies = packageJson.dependencies || {};
  const devDependencies = packageJson.devDependencies || {};

  for (const dep of adapter.detectionPackages.dependencies ?? []) {
    if (dependencies[dep]) {
      return true;
    }
  }

  for (const dep of adapter.detectionPackages.devDependencies ?? []) {
    if (devDependencies[dep]) {
      return true;
    }
  }

  return false;
}

export function updateGitignore(
  adapter: FrameworkAdapter,
  projectPath: string,
) {
  const gitignorePath = path.join(projectPath, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    return;
  }

  const gitignoreContent = fs.readFileSync(gitignorePath, "utf-8");
  const pattern = adapter.envGitignorePattern;

  if (!gitignoreContent.includes(pattern)) {
    fs.appendFileSync(gitignorePath, `\n${pattern}\n`);
  }
}

export function scaffoldFrontend(
  adapter: FrameworkAdapter,
  projectPath: string,
) {
  return adapter.files.map((config) => {
    const { operation, fileName, targetPath } = config;

    if (operation === "delete") {
      const filePath = path.join(projectPath, targetPath, fileName);
      if (fs.existsSync(filePath)) {
        fs.rmSync(filePath, { recursive: true, force: true });
      }
      return `  Deleted ${targetPath === "." ? "" : `${targetPath}/`}${fileName}`;
    }

    const { sourcePath, rename } = config;
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

    const fileContent = fs.readFileSync(templatePath, "utf-8");

    const message = operation === "update" ? "Updated" : "Created";
    if (fs.existsSync(destinationPath)) {
      const backupPath = `${destinationPath}.bak`;
      fs.renameSync(destinationPath, backupPath);
      fs.writeFileSync(destinationPath, fileContent);
      return chalk.yellow(
        `  ⚠️ Updated ${targetPath === "." ? "" : `${targetPath}/`}${name} (original saved as ${name}.bak)`,
      );
    }

    fs.writeFileSync(destinationPath, fileContent);

    return `  ${message} ${targetPath === "." ? "" : `${targetPath}/`}${name}`;
  });
}
