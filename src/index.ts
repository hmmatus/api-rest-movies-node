import express, { Express, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import config from '../config';


const app: Express = express();
const port = config.port || 3000;


app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});