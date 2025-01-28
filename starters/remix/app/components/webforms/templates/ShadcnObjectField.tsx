import { BaseObjectSchema, useFieldErrors } from "@react-formgen/json-schema";
import { SchemaDefinitions } from "@react-formgen/json-schema";
import { JSONSchema7, CustomFields } from "@react-formgen/json-schema";
import { renderField } from "@react-formgen/json-schema";
import { Label } from "../ui/label";

/**
 * Object Field Component Template
 * @param {BaseObjectSchema} schema - The schema for the object field.
 * @param {string[]} path - The path to the object field in the form data.
 * @param {SchemaDefinitions} definitions - The definitions object from the schema.
 * @param {CustomFields} customFields - The custom fields object.
 * @returns {JSX.Element} - The object field component.
 * @example
 * <ShadcnObjectField schema={schema} path={path} definitions={definitions} customFields={customFields} />
 *
 */
export const ShadcnObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
  definitions: SchemaDefinitions;
  customFields?: CustomFields;
}> = ({ schema, path, definitions, customFields = {} }) => {
  const errorsAtPath = useFieldErrors(path);

  return (
    <div className="border border-gray-300 dark:border-gray-600 p-4 my-4 flex flex-col space-y-2">
      {schema.title && <Label>{schema.title}</Label>}
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <p key={index} className="text-sm font-medium text-destructive">
            {error.message}
          </p>
        ))}
      <br />
      {schema.properties &&
        Object.keys(schema.properties).map((key) => (
          <div key={key}>
            {renderField(
              schema.properties?.[key] as JSONSchema7,
              [...path, key],
              definitions,
              customFields
            )}
          </div>
        ))}
    </div>
  );
};
