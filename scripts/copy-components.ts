import * as fs from "fs";
import path from "path";

import { componentsConfig } from "./components-config";

// Storybook components directory
const storybookDir = "starters/storybook/app";
const remixDir = "starters/remix/app";
const nextDir = "starters/next";

function copyDesingSystem(source: string, destination: string) {
  console.log("Cleanup destination directories");
  componentsConfig.directories.forEach((dir) => {
    const dest = path.join(destination, dir.path);
    if (fs.existsSync(dest)) {
      console.log("rm " + dest);
      fs.rmSync(dest, { recursive: true });
    }
  });

  console.log("\nCopying source to destination");
  componentsConfig.directories.forEach((dir) => {
    const src = path.join(source, dir.path);
    const dest = path.join(destination, dir.path);
    console.log("cp " + src + " -> " + dest);
    fs.cpSync(src, dest, { recursive: true, force: true });
  });
}

console.log("Copying remix components..");
copyDesingSystem(storybookDir, remixDir);
console.log("\n");
console.log("Copying next components..");
copyDesingSystem(storybookDir, nextDir);
console.log("\n");

// function modifyComponents() {
//   try {
//     // Add use client to next components
//     const clientComponents = ["/Header/Header.tsx"];
//     for (const component of clientComponents) {
//       const fileName = path.join(nextDir, component);
//       const content = fs.readFileSync(fileName, "utf8");
//       fs.writeFileSync(fileName, `'use client'\n\n${content}`);
//     }
//     // Replace path alias to next components
//     const files = fs.readdirSync(nextDir, {
//       withFileTypes: true,
//       recursive: true,
//       encoding: "utf8",
//     });
//     for (const file of files) {
//       if (file.isDirectory()) {
//         continue;
//       }
//       if (!file.name.endsWith(".tsx")) {
//         continue;
//       }
//       const fileName = path.join(file.parentPath, file.name);
//       const content = fs.readFileSync(fileName, "utf8");
//       fs.writeFileSync(fileName, content.replaceAll("~/", "@/"));
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// console.log("Copying remix components...");
// copyComponents(componentsDir, remixDir);
// console.log("Copying next components...");
// copyComponents(componentsDir, nextDir);
// console.log("Modifying next components...");
// modifyComponents();
