import * as z from 'zod';

const passwordMinLength = 8;

export const RegisterFormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First Name is required',
  }),
  lastName: z.string().min(1, {
    message: 'Last Name is required',
  }),
  email: z.string().email().min(1),
  password: z
    .string()
    .min(passwordMinLength, {
      message: `Password must be at least ${passwordMinLength} characters long`,
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /\d/.test(value), {
      message: 'Password must contain at least one digit',
    })
    .refine((value) => /[^a-zA-Z\d]/.test(value), {
      message: 'Password must contain at least one special character',
    }),
});

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
