import express, { Express, Request, Response } from "express";

import cors from "cors";
import config from "../config";

import admin from "./modules/admins/adminRoutes";

const app: Express = express();
const port = config.port || 3000;

app.use(cors());
app.use(express.json());
app.use(admin);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
