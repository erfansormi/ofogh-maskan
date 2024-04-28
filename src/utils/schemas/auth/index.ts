import { z } from "zod";

export const loginSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
});
export type LoginDataType = z.infer<typeof loginSchema>;
