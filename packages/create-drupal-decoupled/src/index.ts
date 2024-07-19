#!/usr/bin/env node
import { Command } from 'commander'
import { isJavascriptProject, scaffoldFrontend } from './helpers/scaffolding'
import { getFrontendMachineName, SUPPORTED_FRONTENDS } from './constants'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

let projectDirectoryRoute: string

async function main() {
  const program = new Command()
    .name('create-drupal-decoupled') // Temporary name
    .description('Scaffold the integration with Drupal in a decoupled frontend')
    .version('1.0.0', '-v, --version, -V', 'display the version number')
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
      'Frontend framework to use, supported: Remix',
      'Remix'
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
  const frontendMachineName = getFrontendMachineName(frontendFramework)

  if (!frontendFramework) {
    console.error('Please specify the frontend framework to use')
    console.error('Exiting...')
    process.exit(1)
  }

  if (!SUPPORTED_FRONTENDS.includes(frontendMachineName)) {
    console.error(`${frontendFramework} framework is not supported`)
    console.error('Exiting...')
    process.exit(1)
  }

  console.log(`Scaffolding integration for ${frontendFramework}`)
  scaffoldFrontend(frontendMachineName, projectDirectoryRoute)
}

main()
