import  * as yup from "yup";

export const adminSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
})

export interface AdminI extends yup.InferType<typeof adminSchema> {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin";
}

