import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import esbuild from "esbuild";

const dist = join(process.cwd(), "dist");

if (!existsSync(dist)) {
  mkdirSync(dist);
}

const entryPoints = readdirSync(join(process.cwd(), "src"), { recursive: true })
  .filter(
    (file) =>
      file.endsWith(".ts") &&
      statSync(join(process.cwd(), "src", file)).isFile(),
  )
  .map((file) => `src/${file}`);

esbuild
  .build({
    entryPoints,
    outdir: "dist",
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: false,
    format: "esm",
    target: ["esnext"],
    platform: "node",
    external: ["wrangler", "vite", "@urql/core", "drupal-auth-client"],
  })
  .catch(() => process.exit(1));
