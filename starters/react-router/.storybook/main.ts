import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  viteFinal: (config) => {
    // Modify the Vite config as needed
    return config
  },
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-addon-remix-react-router"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../app/static"],
}
export default config
