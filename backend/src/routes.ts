import * as express from "express";
import { PartController } from "./controller/part.controller";

export function getRouter() {
  const router = express.Router();

  const productCtrl = new PartController();

  router.get("/api/part", productCtrl.getAll);
  router.get("/api/part/:id", productCtrl.getOne);
  router.post("/api/part", productCtrl.create);
  router.put("/api/part", productCtrl.update);
  router.delete("/api/part/:id", productCtrl.delete);

  return router;
}
