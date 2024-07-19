import esbuild from 'esbuild'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import process from 'node:process'
import { copy } from 'esbuild-plugin-copy'

const dist = join(process.cwd(), 'dist')

if (!existsSync(dist)) {
  mkdirSync(dist)
}

esbuild
  .build({
    entryPoints: ['src/index.ts'],
    outdir: 'dist',
    bundle: true,
    sourcemap: false,
    minify: true,
    splitting: false,
    platform: 'node',
    target: 'esnext',
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['src/templates/**/*.(*)'],
          to: ['./dist/templates'],
        },
        watch: true,
      }),
    ],
  })
  .catch(() => process.exit(1))
