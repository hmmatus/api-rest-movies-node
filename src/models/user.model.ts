import { MovieI } from "./movie.model";

export interface UserI {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin"
  favMovies: MovieI[];
}

