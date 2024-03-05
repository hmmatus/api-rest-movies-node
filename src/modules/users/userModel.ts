import  * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
})

export interface UserI extends yup.InferType<typeof userSchema> {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user";
}

