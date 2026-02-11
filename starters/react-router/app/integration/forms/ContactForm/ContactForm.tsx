import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { useFetcher } from "react-router";
import { Input, Textarea } from "~/components/form";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { contactFormSchema } from "~/integration/forms/ContactForm/schema";
import type { action } from "~/routes/forms/contact_form";

export const ContactForm = ({ id }: { id: string }) => {
  const fetcher = useFetcher<typeof action>();

  const [form, fields] = useForm({
    id,
    lastResult: fetcher.data?.reply,
    constraint: getZodConstraint(contactFormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactFormSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto max-w-xl">
        {fetcher.data?.reply.status === "success" ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="stroke-green-500" />
              <AlertTitle
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: fetcher.data.data?.confirmation_title || "",
                }}
              ></AlertTitle>
              <AlertDescription
                dangerouslySetInnerHTML={{
                  __html: fetcher.data.data?.confirmation_message || "",
                }}
              ></AlertDescription>
            </Alert>
          </div>
        ) : (
          <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action="/form/contact_form"
            className="space-y-4"
          >
            {form.errors && (
              <div className="space-y-4">
                <Alert>
                  <CircleAlert className="stroke-red-500" />
                  <AlertTitle className="text-lg">Form Error!</AlertTitle>
                  <AlertDescription>{form.errors}</AlertDescription>
                </Alert>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input
                meta={fields.name}
                type="text"
                placeholder="Enter your name"
              />
              {fields.name.errors && (
                <p className="text-sm text-red-500">{fields.name.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                meta={fields.email}
                type="email"
                placeholder="Enter your email"
              />
              {fields.email.errors && (
                <p className="text-sm text-red-500">{fields.email.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.message.id}>Message</Label>
              <Textarea
                meta={fields.message}
                placeholder="Enter your message"
                className="min-h-[120px]"
              />
              {fields.message.errors && (
                <p className="text-sm text-red-500">{fields.message.errors}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </fetcher.Form>
        )}
      </div>
    </div>
  );
};
