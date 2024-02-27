import { MovieI } from "./movie.model";

export interface UserI {
  name: string;
  email: string;
  password: string;
  role: UserRoleI;
}

export enum UserRoleI {
  admin = "admin",
  customer = "customer",
}
export interface UserCustomerI extends UserI {
  favMovies: [];
}

export interface UserAdminI extends UserI {
  idCinema: string;
}
