import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const registerSchema = loginSchema.extend({
  name: z.string(),
  confirmPassword: z.string(),
});

export const signUpSchema = registerSchema.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
