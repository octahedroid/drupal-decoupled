#!/usr/bin/env node
import { Command } from 'commander'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

let projectDirectoryRoute: string

async function main() {
  const program = new Command()
    .name('create-drupal-decoupled') // Temporary name
    .description(
      'Scaffold the integration with Drupal in a decoupled frontend'
    )
    .version('1.0.0', '-v, --version, -V', 'display the version number')
    .arguments('[project-directory]')
    .action((projectDirectory) => {
      projectDirectoryRoute = projectDirectory || '.'
    })
    .usage('<project-directory> [options]')
    .option('-f, --frontend <frontend>', 'Frontend framework to use', 'remix')
    .parse(process.argv)

  const options = program.opts()
  console.log('Options:', options)
  console.log('projectDirectoryRoute:', projectDirectoryRoute)
}

main()
