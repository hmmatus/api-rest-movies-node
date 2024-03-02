export interface MovieI {
  id: string;
  title: string;
  description: string;
  image: string;
  stock: number;
  rentAmount: number;
  saleAmount: number;
  availability: number;
  likesCount: number;
}

export interface FileI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}