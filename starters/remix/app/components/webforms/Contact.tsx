import {FormProvider, FormgenJSONSchema7} from "@react-formgen/json-schema";
import {ShadcnFormComponent} from "~/components/webforms/templates";

type ContactProps = {
  heading: string;
  subheading: string;
  description: string;
  schema: FormgenJSONSchema7;
}

export const Contact = ({
  schema,
  heading,
  subheading,
  description,
 }: ContactProps) => {
  const handleSubmit = (data) => {
    console.log("Form submitted with data:", data);
  };

  const handleErrors = (errors) => {
    console.error("Form submission errors:", errors);
  };

  return (
    <div className="p-4 pl-8">
      <h1>{heading}</h1>
      <h2>{subheading}</h2>
      <p>{description}</p>
      <FormProvider schema={schema}>
        <ShadcnFormComponent onSubmit={handleSubmit} onError={handleErrors} />
      </FormProvider>
    </div>
  );
};
