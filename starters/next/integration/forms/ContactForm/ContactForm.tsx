"use client";
import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { Input, Textarea } from "@/components/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { contactFormSchema } from "@/integration/forms/ContactForm/schema";
import { useActionState } from "react";
import { submitContactFormAction } from "@/integration/forms/ContactForm/action";

export const ContactForm = ({ id }: { id: string }) => {
  const [state, action] = useActionState(submitContactFormAction, undefined);
  const [form, fields] = useForm({
    id,
    lastResult: state?.reply,
    constraint: getZodConstraint(contactFormSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactFormSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto max-w-xl">
        {state?.reply.status === "success" ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="stroke-green-500" />
              <AlertTitle
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: "<h2>Success!</h2>",
                }}
              ></AlertTitle>
              <AlertDescription
                dangerouslySetInnerHTML={{
                  __html: "<p>Your message has been sent successfully.</p>",
                }}
              ></AlertDescription>
            </Alert>
          </div>
        ) : (
          <form
            {...getFormProps(form)}
            method="POST"
            action={action}
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
          </form>
        )}
      </div>
    </div>
  );
};
