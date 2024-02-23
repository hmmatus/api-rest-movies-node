export interface CinemaI {
  name: string;
  description: string;
}

export interface UpdateCinemaRequestBody extends CinemaI {
  id: string;
}

export interface DeleteCinemaRequestBody {
  id: string
}