import express, { type Express } from "express";

import cors from "cors";
import config from "../config";

import admin from "./modules/admins/adminRoutes";
import movies from "./modules/movies/movieRoutes";
import users from "./modules/users/userRoutes";
import transactions from "./modules/transactions/transactionRoutes";
import cron from "node-cron";
import { checkTransactionsExpired } from "./modules/penalizations/penalizationsDataAcess";

const app: Express = express();
const port = config.port ?? 3000;

app.use(cors());
app.use(express.json());
app.use(admin);
app.use(movies);
app.use(users);
app.use(transactions);

cron.schedule("0 0 * * *", () => {
  void checkTransactionsExpired();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
