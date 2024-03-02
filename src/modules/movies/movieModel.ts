import * as yup from "yup";
export interface FileI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export enum MovieOrderEnum {
  likes = "likes",
  default = "default"
}
export const movieSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  stock: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  rentAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  saleAmount: yup
    .number()
    .required()
    .test("greaterThanCero", "Value must be greater than 0", (value) => {
      return value > 0;
    }),
  availability: yup.string().required(),
  image: yup.string().required(),
});

export interface MovieI extends yup.InferType<typeof movieSchema> {
  id: string;
  countLikes: number;
}
