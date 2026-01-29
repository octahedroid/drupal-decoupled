import type { Meta, StoryObj } from '@storybook/react-vite'

const fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`

const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
}

const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

function TypesetSample({
  size,
  weight,
  label,
}: {
  size: number
  weight: number
  label: string
}) {
  return (
    <div className="mb-6 border-b border-gray-100 pb-4">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <p
        style={{
          fontSize: `${size}px`,
          fontWeight: weight,
          fontFamily,
          lineHeight: 1.4,
        }}
      >
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  )
}

function Typography() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Typography</h1>
      <p className="text-gray-600 mb-8">
        This page showcases the typography styles used in our design system,
        based on Tailwind CSS classes.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Font Family</h2>
        <p className="text-gray-600 mb-4">
          Tailwind CSS uses a "native font stack" by default. This means it will
          use the best-looking default system font for each operating system.
        </p>
        <p style={{ fontFamily }} className="p-4 bg-gray-50 rounded-md">
          This text is using the default Tailwind font stack.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Font Sizes</h2>
        {Object.entries(fontSizes).map(([name, size]) => (
          <TypesetSample
            key={name}
            size={size}
            weight={400}
            label={`text-${name} (${size}px)`}
          />
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>
        {Object.entries(fontWeights).map(([name, weight]) => (
          <TypesetSample
            key={name}
            size={16}
            weight={weight}
            label={`font-${name} (${weight})`}
          />
        ))}
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Tokens/Typography',
  component: Typography,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
