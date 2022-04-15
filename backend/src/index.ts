import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { getRouter } from "./routes";
const cors = require("cors");

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(getRouter());

    app.listen(8080, () => {
      console.log("Listening on port 8080");
    });
  })
  .catch((error) => console.log(error));
