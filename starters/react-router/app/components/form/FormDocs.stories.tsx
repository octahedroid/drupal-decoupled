import type { Meta, StoryObj } from "@storybook/react-vite";

function FormDocs() {
  return (
    <div className="p-6 max-w-3xl prose prose-gray">
      <h1>Forms</h1>

      <h2>Overview</h2>
      <p>
        Our form components provide a robust foundation for building accessible,
        validated forms across your application. These components are designed
        to work seamlessly with modern form validation libraries and follow best
        practices for user experience.
      </p>

      <h2>Recommended Implementation</h2>

      <h3>Libraries</h3>
      <p>We recommend using the following libraries for form implementation:</p>
      <ul>
        <li>
          <strong>
            <a
              href="https://zod.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zod
            </a>
          </strong>
          : A TypeScript-first schema validation library that enables you to
          define the shape and validation rules for your form data.
        </li>
        <li>
          <strong>
            <a
              href="https://conform.guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conform
            </a>
          </strong>
          : A form validation library designed to work with native HTML form
          elements, providing a great developer experience without sacrificing
          user experience.
        </li>
      </ul>

      <h3>Components</h3>
      <p>
        The form components in this library are wrapper components built on top
        of{" "}
        <a
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          shadcn/ui
        </a>{" "}
        components, specifically designed to work with Conform. These include:
      </p>
      <ul>
        <li>
          <code>Input</code>: A text input component with validation support
        </li>
        <li>
          <code>Textarea</code>: A multi-line text input component with
          validation support
        </li>
        <li>
          Additional form components like checkboxes, radio buttons, and select
          inputs
        </li>
      </ul>
      <p>
        Each component is pre-configured to work with Conform's field metadata,
        making it simple to implement form validation.
      </p>

      <h2>Client-Side vs. Server-Side Validation</h2>
      <p>
        The form stories in Storybook demonstrate client-side validation
        implementations. However, in production applications,{" "}
        <strong>server-side validation is essential</strong> for security and
        data integrity.
      </p>

      <h3>Full Stack Components</h3>
      <p>
        We recommend implementing forms as full stack components, following the
        approach described in{" "}
        <a
          href="https://www.epicweb.dev/full-stack-components"
          target="_blank"
          rel="noopener noreferrer"
        >
          Epic Web's Full Stack Components
        </a>
        . This approach ensures:
      </p>
      <ol>
        <li>Consistent validation logic between client and server</li>
        <li>Progressive enhancement for users without JavaScript</li>
        <li>Better security by not relying solely on client-side validation</li>
      </ol>

      <h2>Best Practices</h2>
      <ol>
        <li>
          <strong>Progressive Enhancement</strong>: Ensure forms work without
          JavaScript
        </li>
        <li>
          <strong>Accessibility</strong>: Use proper labels, error messages, and
          ARIA attributes
        </li>
        <li>
          <strong>Validation Feedback</strong>: Provide clear, immediate
          feedback for validation errors
        </li>
        <li>
          <strong>Security</strong>: Always validate data on the server,
          regardless of client-side validation
        </li>
        <li>
          <strong>Type Safety</strong>: Leverage TypeScript and Zod to ensure
          type safety throughout your form handling
        </li>
      </ol>

      <h2>Example Implementation</h2>
      <p>
        See the Form stories for a complete example of a contact form
        implementation using Zod and Conform.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Form/Docs",
  component: FormDocs,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
