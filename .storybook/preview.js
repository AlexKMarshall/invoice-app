import '../app/styles/tailwind.css'
import '../app/styles/sass-output/main.css'

import { surface } from '../app/storybook-helpers/surface'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chromatic: { viewports: [375, 768, 1440] },
}

export const decorators = [surface]
