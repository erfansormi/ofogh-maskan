import { z } from "zod";
import { errorMessages } from "../../error-message";

export const loginSchema = z.object({
  email: z
    .string({ required_error: errorMessages.required("ایمیل") })
    .email({ message: errorMessages.invalidFormat("ایمیل") }),
  password: z
    .string({ required_error: errorMessages.required("رمز عبور") })
    .min(6, { message: errorMessages.minLength("رمز عبور", 6) }),
});
export type LoginDataType = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    firstname: z
      .string({ required_error: errorMessages.required("نام") })
      .min(3, errorMessages.minLength("نام", 3)),
    lastname: z
      .string({ required_error: errorMessages.required("نام خانوادگی") })
      .min(3, errorMessages.minLength("نام خانوادگی", 3)),
    email: z
      .string({ required_error: errorMessages.required("ایمیل") })
      .email({ message: errorMessages.invalidFormat("ایمیل") }),
    password: z
      .string({ required_error: errorMessages.required("رمز عبور") })
      .min(6, { message: errorMessages.minLength("رمز عبور", 6) }),
    confirmPassword: z
      .string({ required_error: errorMessages.required("تکرار رمز عبور") })
      .min(6, { message: errorMessages.minLength("تکرار رمز عبور", 6) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز های وارد شده یکسان نمی‌باشند!",
    path: ["confirmPassword"],
  });
export type SignupDataType = z.infer<typeof signupSchema>;
