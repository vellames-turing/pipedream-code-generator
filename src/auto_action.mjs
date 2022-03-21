import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import minimist from 'minimist'

export const generate = () => {
  const {
    appName,
    actionKey,
    PIPEDREAM_DIR
  } = minimist(process.argv.slice(2))

  if (!appName) {
    console.log(chalk.red('[ERROR] Missing "appName" param'))
    process.exit(1)
  }

  if (!actionKey) {
    console.log(chalk.red('[ERROR] Missing "actionKey" param'))
    process.exit(1)
  }

  if (!PIPEDREAM_DIR) {
    console.log(chalk.red('[ERROR] Missing "PIPEDREAM_DIR" param'))
    process.exit(1)
  }

  // Create Actions Folder
  const actionsFolderPath = path.join(PIPEDREAM_DIR, 'components', appName, 'actions')
  if (fs.existsSync(actionsFolderPath)) {
    console.log(chalk.yellow('[WARN] General Actions folder already exists, skipping folder creation...'))
  } else {
    fs.mkdirSync(actionsFolderPath)
    console.log(chalk.blue('[INFO] Actions folder successfully created'))
  }

  // Create Action Folder
  const actionFolderPath = path.join(actionsFolderPath, actionKey)
  if (fs.existsSync(actionFolderPath)) {
    console.log(chalk.yellow('[WARN] The folder for this action already exists, skipping folder creation ...'))
  } else {
    fs.mkdirSync(actionFolderPath)
    console.log(chalk.blue('[INFO] Action folder successfully created'))
  }

  // Creating file
  const actionFilePath = path.join(actionFolderPath, `${actionKey}.mjs`)
  if (fs.existsSync(actionFilePath)) {
    console.log(chalk.red('[ERROR] The file already exists. No file will be created'))
    process.exit(1)
  }

  console.log(chalk.blue('[INFO] Creating file...'))
  fs.writeFileSync(actionFilePath, getFileText(appName, actionKey))
  console.log(chalk.green('[SUCCESS] File successfully created!'))
}

const getFileText = (appName, actionKey) => {
  const name = `${actionKey.split('-').join(' ')}`

  return `import app from "../../${appName}.app.mjs";

export default {
  key: "${appName}-${actionKey}",
  name: "${name}",
  description: "${name} [See the docs here]()",
  version: "0.0.1",
  type: "action",
  props: {
    app,
  },
  async run({ $ }) {
    $.export("$summary", "Action successfully performed");
  },
};
`
}
