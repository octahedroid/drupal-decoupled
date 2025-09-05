import { input, checkbox, confirm } from '@inquirer/prompts';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Default configuration
const DEFAULTS = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    tertiary: '#9b59b6',
    accent: '#e74c3c'
  },
  fontSize: '16px'
};

/**
 * Validates if a string is a valid CSS color
 * @param {string} color - The color string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidColor = (color) => {
  const colorRegex = /^(#([0-9A-Fa-f]{3}){1,2}|(rgb|hsl)a?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[01]?\d?\.?\d+\s*)?\)|[a-z]+)$/i;
  return colorRegex.test(color);
};

/**
 * Validates if a string is a valid CSS font size
 * @param {string} size - The font size string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidFontSize = (size) => {
  const sizeRegex = /^\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ch|ex)$/;
  return sizeRegex.test(size);
};

/**
 * Prompts user for color input with validation
 * @param {string} name - The name of the color (e.g., 'primary', 'secondary')
 * @param {string} defaultValue - Default color value
 * @returns {Promise<string>} - Validated color value
 */
async function promptForColor(name, defaultValue) {
  while (true) {
    const value = await input({
      message: `Enter ${name.charAt(0).toUpperCase() + name.slice(1)} Color`,
      default: defaultValue,
      validate: (input) => {
        if (!input || !isValidColor(input)) {
          return 'Please enter a valid CSS color (hex, rgb, rgba, hsl, hsla, or named color)';
        }
        return true;
      }
    });

    if (isValidColor(value)) {
      console.log(`${name.charAt(0).toUpperCase() + name.slice(1)} Color: ${value}\n`);
      return value;
    }
    console.log('Invalid color format. Please try again.\n');
  }
}

/**
 * Generates CSS variables string from configuration
 * @param {Object} config - Configuration object with colors and fontSize
 * @returns {string} - Formatted CSS variables
 */
const generateCss = (config) => {
  const { colors, fontSize } = config;
  return Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .concat(`--font-size: ${fontSize};`)
    .map(line => `  ${line}`)
    .join('\n');
};

/**
 * Injects generated CSS into the global CSS file
 * @param {string} css - CSS variables to inject
 * @returns {Promise<void>}
 */
async function injectCss(css) {
  try {
    const currentFileUrl = import.meta.url;
    const currentDir = path.dirname(fileURLToPath(currentFileUrl));
    const globalCssPath = path.resolve(currentDir, '../app/globals.css');

    console.log('\nGenerating CSS variables...');
    
    let content = await fs.readFile(globalCssPath, 'utf-8');
    const rootBlockRegex = /:root\s*\{([^}]*)\}/s;
    const match = content.match(rootBlockRegex);

    if (!match) {
      throw new Error(':root block not found in global.css');
    }

    // Remove existing CSS variables
    const cleanedContent = content.replace(
      /\s*--(primary|secondary|tertiary|accent|font-size):[^;]+;/g,
      ''
    );

    // Insert new CSS variables
    const updatedContent = cleanedContent.replace(
      rootBlockRegex,
      (match, existingVars) => {
        return `:root {\n${existingVars.trim()}\n${css}\n}`;
      }
    );

    // Show preview
    console.log('\nPreview of changes:');
    console.log('='.repeat(50));
    console.log(css);
    console.log('='.repeat(50));

    const confirmChanges = await confirm({
      message: 'Apply these changes to global.css?',
      default: true
    });

    if (confirmChanges) {
      await fs.writeFile(globalCssPath, updatedContent, 'utf-8');
      console.log('\n✅ CSS variables updated successfully!');
    } else {
      console.log('\n❌ Changes discarded.');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

/**
 * Main function to run the CSS generator
 */
async function main() {
  try {
    console.log('🎨 CSS Variables Generator\n');

    // Prompt for colors
    const colors = {
      primary: await promptForColor('primary', DEFAULTS.colors.primary),
      secondary: await promptForColor('secondary', DEFAULTS.colors.secondary),
      tertiary: await promptForColor('tertiary', DEFAULTS.colors.tertiary),
      accent: await promptForColor('accent', DEFAULTS.colors.accent)
    };

    // Prompt for font size
    let fontSize;
    while (true) {
      fontSize = await input({
        message: 'Enter Base Font Size',
        default: DEFAULTS.fontSize,
        validate: (input) => {
          if (!input || !isValidFontSize(input)) {
            return 'Please enter a valid CSS font size (e.g., 16px, 1rem, 100%)';
          }
          return true;
        }
      });

      if (isValidFontSize(fontSize)) {
        console.log(`Base Font Size: ${fontSize}\n`);
        break;
      }
      console.log('Invalid font size format. Please try again.\n');
    }

    // Generate and inject CSS
    const config = { colors, fontSize };
    const css = generateCss(config);
    await injectCss(css);

  } catch (error) {
    console.error('\n❌ An error occurred:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();