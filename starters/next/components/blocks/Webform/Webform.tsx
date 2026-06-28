import type { FC } from "react";

type FormComponent = FC<{ id: string }>;

export interface WebformProps {
  formId: string;
  heading: string;
  subheading?: string | null;
  description?: string | null;
}

export const webformComponents: Record<string, FormComponent> = {};

export const Webform = ({
  formId,
  heading,
  subheading,
  description,
}: WebformProps) => {
  const Form = webformComponents[formId];

  if (!Form) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 md:py-16 lg:py-24">
      <div>
        <h2 className="mb-5 text-3xl font-bold sm:text-4xl md:text-5xl">
          {heading}
        </h2>
        {subheading && <h3 className="mb-3 text-xl">{subheading}</h3>}
        {description && (
          <p
            className="text-muted-foreground mb-5 text-lg"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <div className="py-8 md:py-16 lg:py-24">
          <Form id={formId} />
        </div>
      </div>
    </div>
  );
};
