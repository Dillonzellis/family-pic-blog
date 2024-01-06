import { z } from "zod";

export const SignUpCredentialsValidator = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
    userName: z.string().min(1, "Name is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const SignInCredentialsValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type TSignUpCredentialsValidator = z.infer<
  typeof SignUpCredentialsValidator
>;

export type TSignInCredentialsValidator = z.infer<
  typeof SignInCredentialsValidator
>;
