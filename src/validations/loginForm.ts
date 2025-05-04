import { z } from "zod";
const basicSchema = z.object({
  email: z.string().email().nonempty("your email should not be empty"),
  password: z
    .string()
    .nonempty("your password should not be empty")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        "Password must contain at least 8 characters, including letters and numbers",
    }),
});
type TbasicSchema = z.infer<typeof basicSchema>;
export { basicSchema, type TbasicSchema };
