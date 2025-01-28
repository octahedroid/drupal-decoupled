import { NumberSchema, useFieldData, useFieldErrors } from "@react-formgen/json-schema";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

/**
 * Number Field Component Template
 * @param {NumberSchema} schema - The schema for the number field.
 * @param {string[]} path - The path to the number field in the form data.
 * @returns {JSX.Element} - The number field component.
 * @example
 * <ShadcnNumberField schema={schema} path={path} />
 *
 */
export const ShadcnNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFieldData(path);
  const errorsAtPath = useFieldErrors(path);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value ? Number(event.target.value) : null);
  };

  return (
    <div className="flex flex-col space-y-2">
      {schema.title && <Label>{schema.title}</Label>}
      <Input
        type="number"
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="w-24"
      />
      {schema.description && (
        <p className="text-sm text-muted-foreground">{schema.description}</p>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as number} />
          ))}
        </datalist>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <p key={index} className="text-sm font-medium text-destructive">
            {error.message}
          </p>
        ))}
    </div>
  );
};
