export interface TransactionI {
  id: string;
  description: string;
  type: TransactionType;
  idMovie: string;
  idUser: string;
  expirationDate?: string;
  qty: number;
}

export interface GetTransactionsRequestParams {
  idUser: string;
  limit: number;
  currentPage: number;
}

export interface GetTransactionsResponseParams {
  data: TransactionI[];
  currentPage: number;
  pages: number;
}

export enum TransactionType {
  RENT = "rent",
  PURCHASE = "purchase",
}

export interface DetailTransactionResponse {
  id: string;
  idMovie: string;
  title: string;
  image: string;
  expirationDate: string | null;
  qty: number;
  type: TransactionType;
}
