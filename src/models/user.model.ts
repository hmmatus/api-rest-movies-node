import { MovieI } from "./movie.model";

export interface UserI {
  id: string;
  name: string;
  role: "customer" | "admin"
  favMovies: MovieI[];
}

