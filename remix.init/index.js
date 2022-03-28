const { execSync } = require('child_process')
const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')
const inquirer = require('inquirer')

const sort = require('sort-package-json')

function getRandomString(length) {
  return crypto.randomBytes(length).toString('hex')
}

async function main({ rootDirectory }) {
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, '.env.example')
  const ENV_PATH = path.join(rootDirectory, '.env')
  const PACKAGE_JSON_PATH = path.join(rootDirectory, 'package.json')

  const DIR_NAME = path.basename(rootDirectory)
  const SUFFIX = getRandomString(2)

  const APP_NAME = (DIR_NAME + '-' + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, '-')

  const [, env, packageJson] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, 'utf-8'),
    fs.readFile(PACKAGE_JSON_PATH, 'utf-8'),
  ])

  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  )

  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2
    ) + '\n'

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
  ])

  execSync(`npm run setup`, { stdio: 'inherit', cwd: rootDirectory })

  // TODO: There is currently an issue with the test cleanup script that results
  // in an error when running Cypress in some cases. Add this question back
  // when this is fixed.
  // await askSetupQuestions({ rootDirectory }).catch((error) => {
  //   if (error.isTtyError) {
  //     // Prompt couldn't be rendered in the current environment
  //   } else {
  //     throw error;
  //   }
  // });

  console.log(
    `Setup is complete. You're now ready to rock and roll 🤘

Start development with \`npm run dev\`
    `.trim()
  )
}

async function askSetupQuestions({ rootDirectory }) {
  const answers = await inquirer.prompt([
    {
      name: 'validate',
      type: 'confirm',
      default: false,
      message:
        'Do you want to run the build/tests/etc to verify things are setup properly?',
    },
  ])

  if (answers.validate) {
    console.log(
      `Running the validate script to make sure everything was set up properly`
    )
    execSync(`npm run validate`, { stdio: 'inherit', cwd: rootDirectory })
  }
}

module.exports = main
