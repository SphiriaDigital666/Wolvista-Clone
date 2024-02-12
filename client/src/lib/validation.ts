import * as z from 'zod';

export const RegisterFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;


export const LoginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;