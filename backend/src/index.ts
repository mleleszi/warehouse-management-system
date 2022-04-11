import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { getRouter } from "./routes";

createConnection()
  .then(async (connection) => {
    const app = express();

    app.use(express.json());
    app.use(getRouter());

    app.listen(8080, () => {
      console.log("Listening on port 8080");
    });
  })
  .catch((error) => console.log(error));
