import type { Preview } from '@storybook/nextjs-vite'

import '../app/globals.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Tokens',
          'Primitives',
          'Blocks',
          'Pages',
          'Form',
          ['*', 'Form - Demo'],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
