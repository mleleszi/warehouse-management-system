import * as express from "express";
import { PartController } from "./controller/part.controller";
import { ProductController } from "./controller/product.controller";
import { BlueprintController } from "./controller/blueprint.controller";
import { CustomerController } from "./controller/customer.controller";
import { OrderController } from "./controller/order.controller";

export function getRouter() {
  const router = express.Router();

  const partController = new PartController();
  const productController = new ProductController();
  const blueprintController = new BlueprintController();
  const customerController = new CustomerController();
  const orderController = new OrderController();

  // part routes
  router.get("/api/part", partController.getAll);
  router.get("/api/part/:id", partController.getOne);
  router.post("/api/part", partController.create);
  router.put("/api/part", partController.update);
  router.delete("/api/part/:id", partController.delete);

  // product routes
  router.get("/api/product", productController.getAll);
  router.get("/api/product/:id", productController.getOne);
  router.post("/api/product", productController.create);
  router.put("/api/product", productController.update);
  router.delete("/api/product/:id", productController.delete);
  router.get(
    "/api/product/:id/blueprint",
    productController.getBlueprintByProduct
  );

  // blueprint routes
  router.get("/api/blueprint", blueprintController.getAll);
  router.get("/api/blueprint/:id", blueprintController.getOne);
  router.post("/api/blueprint", blueprintController.create);
  router.put("/api/blueprint", blueprintController.update);
  router.delete("/api/blueprint/:id", blueprintController.delete);

  // customer routes
  router.get("/api/customer", customerController.getAll);
  router.get("/api/customer/:id", customerController.getOne);
  router.post("/api/customer", customerController.create);
  router.put("/api/customer", customerController.update);
  router.delete("/api/customer/:id", customerController.delete);

  // order routes
  router.get("/api/order", orderController.getAll);
  router.get("/api/order/:id", orderController.getOne);
  router.post("/api/order", orderController.create);
  router.put("/api/order", orderController.update);
  router.delete("/api/order/:id", orderController.delete);

  return router;
}
