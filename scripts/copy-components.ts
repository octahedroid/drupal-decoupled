import * as fs from "fs";
import * as path from "path";
import { componentsConfig } from "./components-config";

// === Constants ===
const STARTERS = {
  STORYBOOK: "starters/storybook/app",
  REMIX: "starters/remix/app",
  NEXT: "starters/next",
  REACT_ROUTER: "starters/react-router/app",
} as const;

const NEXT_CLIENT_COMPONENTS = ["Header"];
const PATH_ALIAS_OLD = "~/";
const PATH_ALIAS_NEW = "@/";

class ComponentSync {
  // === Directory Operations ===

  /**
   * Clears the destination directories before copying.
   * @param destination - The root directory where components will be copied.
   */
  private clearDestination(destination: string): void {
    componentsConfig.directories.forEach((dir) => {
      const destinationPath = path.join(destination, dir.path);
      try {
        if (fs.existsSync(destinationPath)) {
          this.log(`Clearing directory: ${destinationPath}`);
          fs.rmSync(destinationPath, { recursive: true, force: true });
        }
      } catch (error) {
        this.handleError(`Error clearing directory ${destinationPath}`, error);
      }
    });
  }

  /**
   * Main method to copy the design system components.
   * @param source - Source directory path.
   * @param destination - Destination directory path.
   */
  public copyDesignSystem(source: string, destination: string): void {
    try {
      this.log(`Starting design system copy from ${source} to ${destination}`);
      this.clearDestination(destination);
      this.syncComponents(source, destination);
      this.log("Design system copy completed");
    } catch (error) {
      this.handleError("Design system copy failed", error);
    }
  }

  /**
   * Recursively copies directories from source to destination.
   * @param source - The source directory to copy from.
   * @param destination - The destination directory to copy to.
   */
  private syncComponents(source: string, destination: string): void {
    componentsConfig.directories.forEach((dir) => {
      const sourcePath = path.join(source, dir.path);
      const destinationPath = path.join(destination, dir.path);

      try {
        this.log(`Copying: ${sourcePath} -> ${destinationPath}`);
        fs.cpSync(sourcePath, destinationPath, {
          recursive: true,
          force: true,
        });
      } catch (error) {
        this.handleError(`Error copying ${sourcePath}`, error);
      }
    });
  }

  // === File Operations ===

  /**
   * Processes a directory and its files for Next.js adaptation.
   * @param dirPath - The directory to process.
   * @param componentSet - A set of component names that require 'use client'.
   */
  public adaptNextComponents(dir: string, clientComponents: string[]): void {
    const componentSet = new Set(clientComponents);

    componentsConfig.directories.forEach((directory) => {
      const componentsDir = path.join(dir, directory.path);

      try {
        this.processDirectory(componentsDir, componentSet);
      } catch (error) {
        this.handleError(`Error processing directory ${componentsDir}`, error);
      }
    });
  }

  /**
   * Processes files in a directory for Next.js adaptation.
   * @param dirPath - The directory to process.
   * @param componentSet - A set of component names that require 'use client'.
   */
  private processDirectory(dirPath: string, componentSet: Set<string>): void {
    const files = fs.readdirSync(dirPath, {
      withFileTypes: true,
      recursive: true,
    });

    for (const file of files) {
      if (!file.isFile()) continue;

      const filePath = path.join(file.path, file.name);
      const fileName = path.basename(filePath);

      if (!this.isTypeScriptFile(fileName)) continue;

      try {
        this.processFile(filePath, fileName, componentSet);
      } catch (error) {
        this.handleError(`Error processing file ${filePath}`, error);
      }
    }
  }

  /**
   * Processes an individual file for Next.js adaptation.
   * @param filePath - The path to the file.
   * @param fileName - The name of the file.
   * @param componentSet - A set of component names that require 'use client'.
   */
  private processFile(
    filePath: string,
    fileName: string,
    componentSet: Set<string>
  ): void {
    let fileContent = fs.readFileSync(filePath, "utf8");
    const componentName = fileName.replace(/\.tsx?$/, "");

    if (
      componentSet.has(componentName) &&
      !fileContent.includes("use client")
    ) {
      this.log(`Adding 'use client' to ${filePath}`);
      fileContent = `'use client'\n\n${fileContent}`;
    }

    if (fileContent.includes(PATH_ALIAS_OLD)) {
      this.log(`Updating path aliases in ${filePath}`);
      fileContent = fileContent.replace(
        new RegExp(PATH_ALIAS_OLD, "g"),
        PATH_ALIAS_NEW
      );
    }

    fs.writeFileSync(filePath, fileContent, "utf8");
  }

  // === Helpers ===

  /**
   * Checks if a file is a TypeScript file.
   * @param filename - The name of the file.
   * @returns True if the file is a TypeScript file.
   */
  private isTypeScriptFile(filename: string): boolean {
    return /\.(tsx|ts)$/.test(filename);
  }

  /**
   * Logs a message with a timestamp.
   * @param message - The message to log.
   */
  private log(message: string): void {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`);
  }

  /**
   * Handles errors and exits the process.
   * @param message - The error message.
   * @param error - The error object.
   */
  private handleError(message: string, error: unknown): never {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `[${new Date().toISOString()}] ERROR: ${message} - ${errorMessage}`
    );
    process.exit(1);
  }
}

// === Main Execution ===
(async () => {
  try {
    const sync = new ComponentSync();

    console.log("\n=== Copying components for Remix ===");
    sync.copyDesignSystem(STARTERS.STORYBOOK, STARTERS.REMIX);

    console.log("\n=== Copying components for React Router ===");
    sync.copyDesignSystem(STARTERS.STORYBOOK, STARTERS.REACT_ROUTER);

    console.log("\n=== Copying components for Next.js ===");
    sync.copyDesignSystem(STARTERS.STORYBOOK, STARTERS.NEXT);

    console.log("\n=== Adapting components for Next.js ===");
    sync.adaptNextComponents(STARTERS.NEXT, NEXT_CLIENT_COMPONENTS);

    console.log("\n✅ Process completed successfully");
  } catch (error) {
    console.error("\n❌ Error in main execution:", error);
    process.exit(1);
  }
})();
