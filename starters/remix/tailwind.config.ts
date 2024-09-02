import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

// Typography plugin configuration

const typographyConfig = {
  DEFAULT: {
    css: {
      h1: {
        '@apply h1': {},
      },
      h2: {
        '@apply h2': {},
      },
      h3: {
        '@apply h3': {},
      },
      h4: {
        '@apply h4': {},
      },
      h5: {
        '@apply h5': {},
      },
      h6: {
        '@apply h6': {},
      },
    },
  },
}

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: typographyConfig,
    },
  },
  plugins: [require('tailwindcss-animate'), typography],
} satisfies Config
