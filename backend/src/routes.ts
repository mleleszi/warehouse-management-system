import * as express from "express";
import { PartController } from "./controller/part.controller";
import { ProductController } from "./controller/product.controller";
import { BlueprintController } from "./controller/blueprint.controller";
import { CustomerController } from "./controller/customer.controller";
import { OrderController } from "./controller/order.controller";
import { UserController } from "./controller/user.controller";
import { checkAuth } from "./middleware/auth.middleware";

export function getRouter() {
  const router = express.Router();

  const partController = new PartController();
  const productController = new ProductController();
  const blueprintController = new BlueprintController();
  const customerController = new CustomerController();
  const orderController = new OrderController();
  const userController = new UserController();

  // part routes
  router.get("/api/part", checkAuth, partController.getAll);
  router.get("/api/part/:id", checkAuth, partController.getOne);
  router.post("/api/part", checkAuth, partController.create);
  router.put("/api/part", checkAuth, partController.update);
  router.delete("/api/part/:id", checkAuth, partController.delete);

  // product routes
  router.get("/api/product", checkAuth, productController.getAll);
  router.get("/api/product/:id", checkAuth, productController.getOne);
  router.post(
    "/api/product",
    checkAuth,
    productController.saveProductWithBlueprints
  );
  router.put("/api/product", checkAuth, productController.update);
  router.delete("/api/product/:id", checkAuth, productController.delete);
  router.get(
    "/api/part/:id/blueprint",
    checkAuth,
    productController.getBlueprintByProduct
  );

  // blueprint routes
  router.get("/api/blueprint", checkAuth, blueprintController.getAll);
  router.get("/api/blueprint/:id", checkAuth, blueprintController.getOne);
  router.post("/api/blueprint", checkAuth, blueprintController.create);
  router.put("/api/blueprint", checkAuth, blueprintController.update);
  router.delete("/api/blueprint/:id", checkAuth, blueprintController.delete);

  // customer routes
  router.get("/api/customer", checkAuth, customerController.getAll);
  router.get("/api/customer/:id", checkAuth, customerController.getOne);
  router.post("/api/customer", checkAuth, customerController.create);
  router.put("/api/customer", checkAuth, customerController.update);
  router.delete("/api/customer/:id", checkAuth, customerController.delete);

  // order routes
  router.get("/api/order", checkAuth, orderController.getAll);
  router.get("/api/order/:id", checkAuth, orderController.getOne);
  router.post("/api/order", checkAuth, orderController.create);
  router.put("/api/order", checkAuth, orderController.update);
  router.delete("/api/order/:id", checkAuth, orderController.delete);

  // user routes
  router.post("/api/register", userController.register);
  router.post("/api/login", userController.login);

  return router;
}
