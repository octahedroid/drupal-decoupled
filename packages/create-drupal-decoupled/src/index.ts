#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import packageJson from "../package.json";
import {
  getAdapter,
  getFrontendReadableName,
  isSupportedFrontend,
  SUPPORTED_FRONTENDS,
} from "./constants";
import { getDependencyInstallCommand } from "./helpers/dependencies";
import {
  isJavascriptProject,
  isValidFramework,
  scaffoldFrontend,
  updateGitignore,
} from "./helpers/scaffolding";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

let projectDirectoryRoute: string;

async function main() {
  const program = new Command()
    .name("create-drupal-decoupled")
    .description("Scaffold the integration with Drupal in a decoupled frontend")
    .version(
      packageJson.version,
      "-v, --version, -V",
      "display the version number",
    )
    .argument(
      "[project-directory]",
      "Project directory to scaffold the integration",
      ".",
    )
    .action((projectDirectory) => {
      projectDirectoryRoute = projectDirectory || ".";
    })
    .usage("<project-directory> [options]")
    .option(
      "-f, --frontend <frontend>",
      `Frontend framework to use, supported: ${SUPPORTED_FRONTENDS.join(", ")}`,
    )
    .parse(process.argv);

  if (!isJavascriptProject(projectDirectoryRoute)) {
    console.error(
      `Please specify the project directory, ${projectDirectoryRoute === "." ? "the current directory" : projectDirectoryRoute} is not a valid project`,
    );
    console.error("Exiting...");
    process.exit(1);
  }

  let { frontend: frontendFramework } = program.opts();

  if (!frontendFramework || typeof frontendFramework !== "string") {
    console.error("Please specify the frontend framework to use");
    console.error("Exiting...");
    process.exit(1);
  }

  if (frontendFramework === "remix") {
    console.log(
      chalk.yellow(
        "  ⚠️ Remix is now supported via React Router. Mapping flag to react-router...",
      ),
    );
    frontendFramework = "react-router";
  }

  if (!isSupportedFrontend(frontendFramework)) {
    console.error(`${frontendFramework} framework is not supported`);
    console.error("Exiting...");
    process.exit(1);
  }

  const adapter = getAdapter(frontendFramework);

  const frontendReadableName = getFrontendReadableName(frontendFramework);

  if (!isValidFramework(projectDirectoryRoute, frontendFramework)) {
    console.error(
      `Double check that the project is using ${frontendReadableName} framework`,
    );
    console.error("Exiting...");
    process.exit(1);
  }

  console.log(
    chalk.bold(
      `\nScaffolding Drupal integration for ${frontendReadableName}\n`,
    ),
  );

  console.log(chalk.bold("Files:"));
  const createdFiles = scaffoldFrontend(adapter, projectDirectoryRoute);
  updateGitignore(adapter, projectDirectoryRoute);

  for (const fileLog of createdFiles) {
    console.log(fileLog);
  }

  // Print dependency install instructions
  const installCmd = getDependencyInstallCommand(
    adapter,
    projectDirectoryRoute,
  );
  console.log(chalk.bold("\nInstall required dependencies:\n"));
  console.log(`    ${installCmd}`);

  // Print post-scaffold instructions
  if (adapter.postScaffoldInstructions.length > 0) {
    console.log(chalk.bold("\nNext steps:\n"));
    for (const instruction of adapter.postScaffoldInstructions) {
      console.log(`  ${instruction}`);
    }
  }

  console.log(
    chalk.green(
      `\nDrupal integration for ${frontendReadableName} scaffolded successfully!\n`,
    ),
  );
}

main();
