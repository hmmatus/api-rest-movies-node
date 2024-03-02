export enum PaymentType {
  purchase = "purchase",
  rent = "rent"
}

export interface PaymentI {
  idCinema: string;
  idUser: string;
  idMovie: string;
  date: Date;
  amount: number;
  type: PaymentType;
}
