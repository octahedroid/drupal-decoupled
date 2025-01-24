import * as fs from "fs";
import path from "path";

import { componentsConfig } from "./components-config";

// Starters directories
const storybookDir = "starters/storybook/app";
const remixDir = "starters/remix/app";
const nextDir = "starters/next";

// Clear destination directories before copying
function clearDestinationDirectories(destination: string) {
  componentsConfig.directories.forEach((dir) => {
    const dest = path.join(destination, dir.path);
    if (fs.existsSync(dest)) {
      console.log("rm " + dest);
      fs.rmSync(dest, { recursive: true });
    }
  });
}

// Sync directories from source to destination
function syncComponentDirectories(source: string, destination: string) {
  componentsConfig.directories.forEach((dir) => {
    const src = path.join(source, dir.path);
    const dest = path.join(destination, dir.path);
    console.log("cp " + src + " -> " + dest);
    fs.cpSync(src, dest, { recursive: true, force: true });
  });
}

// Copy design system from source to destination
function copyDesingSystem(source: string, destination: string) {
  console.log("Cleanup destination directories");
  clearDestinationDirectories(destination);
  console.log("Copying source to destination");
  syncComponentDirectories(source, destination);
}

// Adapting next components
function nextAdaption(dir: string, componentsToClient: string[]) {
  componentsConfig.directories.forEach((directory) => {
    const componentsDir = path.join(dir, directory.path);
    const files = fs.readdirSync(componentsDir, {
      withFileTypes: true,
      recursive: true,
      encoding: "utf8",
    });

    for (const file of files) {
      if (file.isDirectory()) {
        continue;
      }
      if (!file.name.endsWith(".tsx") && !file.name.endsWith(".ts")) {
        continue;
      }
      if (componentsToClient.includes(file.name.replace(".tsx", ""))) {
        console.log("Adding use client to " + file.name);
        const fileName = path.join(file.parentPath, file.name);
        const content = fs.readFileSync(fileName, "utf8");
        fs.writeFileSync(fileName, `'use client'\n\n${content}`);
      }
      console.log("Replacing path alias to next components in " + file.name);
      const fileName = path.join(file.parentPath, file.name);
      const content = fs.readFileSync(fileName, "utf8");
      fs.writeFileSync(fileName, content.replaceAll("~/", "@/"));
    }
  });
}

// Copy components
console.log("Copying remix components..");
copyDesingSystem(storybookDir, remixDir);
console.log("\n");
console.log("Copying next components..");
copyDesingSystem(storybookDir, nextDir);
console.log("\n");

console.log("Adaptering next components...");
nextAdaption(nextDir, ["Header"]);
console.log("\n");
