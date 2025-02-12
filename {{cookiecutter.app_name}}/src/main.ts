import { Command, Option } from 'commander'

import { run } from './controller'
import { Logger } from './logger'

const program = new Command()
  .version('{{cookiecutter.init_version}}')
  .description(
    'A description.',
  )

program.addOption(
  new Option('-l, --log-level <level>', 'Log level')
    .choices(['debug', 'info', 'warn', 'error'])
    .default('info'),
)

program.parse(process.argv)

const opts = program.opts()
Logger.create(opts.logLevel)

const stringified = JSON.stringify(opts, null, ' ')
Logger.info(`Using cli options: ${stringified}`)

run({})
