import minimist from 'minimist'
import chalk from 'chalk'

import { generate as autoAction } from './auto_action.mjs'

const {
  action
} = minimist(process.argv.slice(2))

if (!action) {
  console.log(chalk.red('[ERROR] Missing "action" param'))
  process.exit(1)
}

switch (action) {
  case 'action':
    autoAction()
    break
  default:
    console.log(chalk.red('[ERROR] Action not allowed'))
    break
}
