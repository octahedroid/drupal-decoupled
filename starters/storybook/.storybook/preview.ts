import type { Preview } from '@storybook/react'

import '../app/tailwind.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Tokens', 'Primitives', 'Blocks', 'Pages', 'Form', ['*', 'Form - Contact Form']],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
