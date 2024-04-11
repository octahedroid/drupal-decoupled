import esbuild from 'esbuild';
import {
    readdirSync,
    statSync,
    existsSync,
    mkdirSync,
} from "fs";
import { join } from "path";

const dist = join(process.cwd(), "dist");

if (!existsSync(dist)) {
    mkdirSync(dist);
}

const entryPoints = readdirSync(join(process.cwd(), "src"))
    .filter(
        (file) =>
            file.endsWith(".ts") &&
            statSync(join(process.cwd(), "src", file)).isFile()
    )
    .map((file) => `src/${file}`);

esbuild
    .build({
        entryPoints,
        outdir: 'dist',
        bundle: true,
        sourcemap: false,
        minify: true,
        splitting: false,
        format: 'esm',
        target: ['esnext']
    })
    .catch(() => process.exit(1));