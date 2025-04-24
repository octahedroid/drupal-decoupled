#!/usr/bin/env node
import { Command } from 'commander'
import packageJson from '../package.json'
import {
  isJavascriptProject,
  isValidFramework,
  scaffoldFrontend,
  updateGitignore,
} from './helpers/scaffolding'
import {
  getFrontendReadableName,
  isSupportedFrontend,
  SUPPORTED_FRONTENDS,
} from './constants'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

let projectDirectoryRoute: string

async function main() {
  const program = new Command()
    .name('create-drupal-decoupled') // Temporary name
    .description('Scaffold the integration with Drupal in a decoupled frontend')
    .version(
      packageJson.version,
      '-v, --version, -V',
      'display the version number'
    )
    .argument(
      '[project-directory]',
      'Project directory to scaffold the integration',
      '.'
    )
    .action((projectDirectory) => {
      projectDirectoryRoute = projectDirectory || '.'
    })
    .usage('<project-directory> [options]')
    .option(
      '-f, --frontend <frontend>',
      `Frontend framework to use, supported: ${SUPPORTED_FRONTENDS.join(', ')}`
    )
    .parse(process.argv)

  if (!isJavascriptProject(projectDirectoryRoute)) {
    console.error(
      `Please specify the project directory, ${projectDirectoryRoute === '.' ? 'the current directory' : projectDirectoryRoute} is not a valid project`
    )
    console.error('Exiting...')
    process.exit(1)
  }

  const { frontend: frontendFramework } = program.opts()

  if (!frontendFramework || typeof frontendFramework !== 'string') {
    console.error('Please specify the frontend framework to use')
    console.error('Exiting...')
    process.exit(1)
  }

  if (!isSupportedFrontend(frontendFramework)) {
    console.error(`${frontendFramework} framework is not supported`)
    console.error('Exiting...')
    process.exit(1)
  }
  const frontendReadableName = getFrontendReadableName(frontendFramework)

  if (!isValidFramework(projectDirectoryRoute, frontendFramework)) {
    console.error(
      `Double check that the project is using ${frontendReadableName} framework`
    )
    console.error('Exiting...')
    process.exit(1)
  }

  console.log(`Scaffolding integration for ${frontendReadableName}\n`)
  const createdFiles = scaffoldFrontend(
    frontendFramework,
    projectDirectoryRoute
  )
  updateGitignore(frontendFramework, projectDirectoryRoute)

  createdFiles.forEach((fileLog) => {
    console.log(fileLog)
  })

  console.log(
    `\nIntegration for ${frontendReadableName} scaffolded successfully!`
  )
}

main()
