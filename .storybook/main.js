const path = require('path')

module.exports = {
  stories: ['../app'],
  addons: [
    path.resolve('./.storybook/ts-paths'),
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  features: {
    interactionsDebugger: true,
  },
  framework: '@storybook/react',
}
