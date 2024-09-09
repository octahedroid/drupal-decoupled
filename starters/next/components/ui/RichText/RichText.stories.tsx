import type { Meta, StoryObj } from '@storybook/react'
import { RichText } from '@/components/ui'

const meta: Meta<typeof RichText> = {
  title: 'Components/RichText',
  component: RichText,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
  },
  args: {
    content: '<p>Default rich text content</p>',
  },
}

export default meta
type Story = StoryObj<typeof RichText>

export const Default: Story = {}

export const AllElements: Story = {
  args: {
    content: `
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
      <p><strong>Bold text</strong></p>
      <p><em>Italic text</em></p>
      <p><s>Strikethrough text</s></p>
      <p>Text with <sup>superscript</sup> and <sub>subscript</sub></p>
      <p><a href="#">Link</a></p>
      <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
      </ol>
      <blockquote>
        <p>This is a blockquote</p>
      </blockquote>
      <figure>
        <img src="https://picsum.photos/id/1/800/600" alt="Placeholder image">
        <figcaption>Image caption</figcaption>
      </figure>
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <pre><code class="language-javascript">
function helloWorld() {
  console.log("Hello, world!");
}
      </code></pre>
    `,
  },
}

export const Headings: Story = {
  args: {
    content: `
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    `,
  },
}

export const TextFormatting: Story = {
  args: {
    content: `
      <p><strong>Bold text</strong></p>
      <p><em>Italic text</em></p>
      <p><s>Strikethrough text</s></p>
      <p>Text with <sup>superscript</sup> and <sub>subscript</sub></p>
    `,
  },
}

export const Lists: Story = {
  args: {
    content: `
      <ul>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
        <li>Unordered list item 3</li>
      </ul>
      <ol>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </ol>
    `,
  },
}

export const BlockquoteAndImage: Story = {
  args: {
    content: `
      <blockquote>
        <p>This is a blockquote. It can be used to highlight important quotes or statements.</p>
      </blockquote>
      <figure>
        <img src="https://picsum.photos/id/1/800/600" alt="Placeholder image">
        <figcaption>This is an image caption</figcaption>
      </figure>
    `,
  },
}

export const Table: Story = {
  args: {
    content: `
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
        </tbody>
      </table>
    `,
  },
}

export const CodeBlock: Story = {
  args: {
    content: `
      <pre><code class="language-javascript">
function exampleFunction() {
  const message = "This is a code block";
  console.log(message);
  return message.length;
}
      </code></pre>
    `,
  },
}

export const RealWorldExample: Story = {
  args: {
    content: `
      <h2>Welcome to Our Product</h2>
      <p>Our innovative solution helps businesses streamline their operations and boost productivity.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Intuitive user interface</li>
        <li>Robust data analysis</li>
        <li>Seamless integration with existing systems</li>
      </ul>
      <blockquote>
        <p>"This product has revolutionized our workflow!" - Jane Doe, CEO of Tech Corp</p>
      </blockquote>
      <h3>How It Works</h3>
      <ol>
        <li>Input your data</li>
        <li>Choose your analysis parameters</li>
        <li>Review the generated insights</li>
      </ol>
      <p>Get started today and see the difference for yourself!</p>
      <pre><code class="language-python">
import our_product

data = load_data("your_file.csv")
results = our_product.analyze(data)
print(results.summary())
      </code></pre>
    `,
  },
}
