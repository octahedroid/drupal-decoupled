import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  "stories": [
    '../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  "addons": [],
  "framework": '@storybook/react-vite',
  "staticDirs": ['../app/static'],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsconfigPaths(), tailwindcss()],
    })
  },
}
export default config
