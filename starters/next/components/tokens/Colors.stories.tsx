import type { Meta, StoryObj } from "@storybook/react-vite";
import colors from "tailwindcss/colors";

type ColorShades = Record<string, string>;

function ColorSwatch({ name, shades }: { name: string; shades: ColorShades }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3 capitalize">{name}</h3>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Object.entries(shades).map(([shade, hex]) => (
          <div key={shade} className="flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-md border border-gray-200 shadow-sm"
              style={{ backgroundColor: hex }}
            />
            <span className="text-xs mt-1 text-gray-600">{shade}</span>
            <span className="text-xs text-gray-400">{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorPalette() {
  const colorEntries = Object.entries(colors).filter(
    ([, value]) => typeof value !== "string",
  ) as [string, ColorShades][];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Colors</h1>
      <p className="text-gray-600 mb-8">
        This is a list of all the colors available in Tailwind CSS.
      </p>
      {colorEntries.map(([name, shades]) => (
        <ColorSwatch key={name} name={name} shades={shades} />
      ))}
    </div>
  );
}

const meta: Meta = {
  title: "Tokens/Colors",
  component: ColorPalette,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
