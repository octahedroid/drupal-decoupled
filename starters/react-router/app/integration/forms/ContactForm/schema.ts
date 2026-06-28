import { z } from "zod/v4";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
