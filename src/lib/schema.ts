import { z } from "zod";

export const enquirySchema = z.object({
  parent_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Phone number must be valid").max(20),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  child_grade: z.string().min(1, "Child grade is required"),
  program: z.string().min(1, "Program is required"),
  preferred_start: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
