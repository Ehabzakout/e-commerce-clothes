import { z } from "zod";

const basicSchema = z
  .object({
    first_name: z
      .string()
      .min(3, { message: "Your name should be more than 3 char's" })
      .nonempty("Your first name should not be empty"),
    last_name: z.string().nonempty("your last name should not be empty"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("your email should not be empty"),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain at least 8 characters, including UPPER/lowercase and numbers",
      )
      .nonempty("your password should not be empty"),
    confirm_password: z.string(),
  })
  .refine((input) => input.password === input.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
type TRegisterForm = z.infer<typeof basicSchema>;
export { basicSchema, type TRegisterForm };
