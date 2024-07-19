import fs from 'node:fs'
import path from 'node:path'
import { SupportedFrontend } from 'src/constants'

const SCAFFOLD_FILES_PER_FRONTEND = {
  remix: {
    files: [
      {
        folderPath: 'app/utils',
        fileName: 'drupal-client.server.ts',
      },
      {
        folderPath: '.',
        fileName: 'env.example',
        // This is due the copy plugin from esbuild, it doesn't allow to copy files with a dot at the beginning
        rename: '.env.example',
      },
      {
        folderPath: 'app/routes',
        fileName: '$.tsx',
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

  frontendFiles.forEach(({ folderPath, fileName, rename }) => {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${frontend}-graphql`,
      fileName
    )
    const destinationPath = path.join(
      process.cwd(),
      projectPath,
      folderPath,
      rename || fileName
    )

    fs.mkdirSync(path.dirname(destinationPath), { recursive: true })
    fs.copyFileSync(templatePath, destinationPath)
  })
}
