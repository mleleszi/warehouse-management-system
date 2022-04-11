import * as express from "express";
import { PartController } from "./controller/part.controller";
import { ProductController } from "./controller/product.controller";
import { BlueprintController } from "./controller/blueprint.controller";

export function getRouter() {
  const router = express.Router();

  const partController = new PartController();
  const productController = new ProductController();
  const blueprintController = new BlueprintController();

  router.get("/api/part", partController.getAll);
  router.get("/api/part/:id", partController.getOne);
  router.post("/api/part", partController.create);
  router.put("/api/part", partController.update);
  router.delete("/api/part/:id", partController.delete);

  router.get("/api/product", productController.getAll);
  router.get("/api/product/:id", productController.getOne);
  router.post("/api/product", productController.create);
  router.put("/api/product", productController.update);
  router.delete("/api/product/:id", productController.delete);
  router.get(
    "/api/product/:id/blueprint",
    productController.getBlueprintByProduct
  );

  router.get("/api/blueprint", blueprintController.getAll);
  router.get("/api/blueprint/:id", blueprintController.getOne);
  router.post("/api/blueprint", blueprintController.create);
  router.put("/api/blueprint", blueprintController.update);
  router.delete("/api/blueprint/:id", blueprintController.delete);

  return router;
}
