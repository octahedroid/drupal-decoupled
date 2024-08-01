import fs from 'node:fs'
import path from 'node:path'
import type { SupportedFrontend } from 'src/constants'

type SourcePath = `${SupportedFrontend}-graphql` | 'shared'

type FilesConfig = {
  targetPath: string
  sourcePath: SourcePath
  fileName: string
  rename?: string
}

type ScaffoldFilesPerFrontend = Record<
  SupportedFrontend,
  {
    files: FilesConfig[]
  }
>

const SCAFFOLD_FILES_PER_FRONTEND: Readonly<ScaffoldFilesPerFrontend> = {
  remix: {
    files: [
      {
        targetPath: 'app/utils/drupal',
        sourcePath: 'shared',
        fileName: 'client.server.ts',
      },
      {
        targetPath: 'app/utils/drupal',
        sourcePath: 'remix-graphql',
        fileName: 'calculate-path.server.ts',
      },
      {
        targetPath: 'app/routes',
        sourcePath: 'remix-graphql',
        fileName: '$.tsx',
      },
      {
        targetPath: 'app',
        sourcePath: 'shared',
        fileName: 'tailwind.css',
      },
      {
        targetPath: '.',
        sourcePath: 'shared',
        fileName: '.env.example',
      },
    ],
  },
  next: {
    files: [
      {
        targetPath: 'utils/drupal',
        sourcePath: 'shared',
        fileName: 'client.server.ts',
        rename: 'client.ts',
      },
      {
        targetPath: 'utils/drupal',
        sourcePath: 'next-graphql',
        fileName: 'calculate-path.ts',
      },
      {
        targetPath: 'app/[...slug]',
        sourcePath: 'next-graphql',
        fileName: 'page.tsx',
      },
      {
        targetPath: 'app',
        sourcePath: 'shared',
        fileName: 'tailwind.css',
        rename: 'globals.css',
      },
      {
        targetPath: '.',
        sourcePath: 'shared',
        fileName: '.env.example',
      },
    ],
  },
}

export function isJavascriptProject(projectPath: string) {
  return fs.existsSync(path.join(projectPath, 'package.json'))
}

export function scaffoldFrontend(
  frontend: SupportedFrontend,
  projectPath: string
) {
  const frontendFiles = SCAFFOLD_FILES_PER_FRONTEND[frontend].files

  return frontendFiles.map(({ targetPath, sourcePath, fileName, rename }) => {
    const name = rename || fileName

    const templatePath = path.join(__dirname, 'templates', sourcePath, fileName)
    const destinationPath = path.join(
      process.cwd(),
      projectPath,
      targetPath,
      name
    )

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
    fs.copyFileSync(templatePath, destinationPath)

    return `${targetPath === '.' ? '' : `${targetPath}/`}${name}`
  })
}
