import esbuild from "esbuild";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import process from "node:process";

const dist = join(process.cwd(), "dist");

if (!existsSync(dist)) {
  mkdirSync(dist);
}

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: false,
    platform: "node",
    target: "esnext",
  })
  .catch(() => process.exit(1));
