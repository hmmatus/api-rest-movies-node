export interface CinemaI {
  id: string;
  name: string;
  description: string;
}

export interface UpdateCinemaRequestBody extends CinemaI {
  id: string;
}

export interface DeleteCinemaRequestBody {
  id: string
}