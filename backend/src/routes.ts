import * as express from "express";
import { PartController } from "./controller/part.controller";
import { ProductController } from "./controller/product.controller";
import { BlueprintController } from "./controller/blueprint.controller";
import { CustomerController } from "./controller/customer.controller";
import { OrderController } from "./controller/order.controller";
import { UserController } from "./controller/user.controller";
import { checkAdmin, checkAuth } from "./middleware/auth.middleware";

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
  router.post("/api/part", checkAuth, checkAdmin, partController.create);
  router.put("/api/part", checkAuth, checkAdmin, partController.update);
  router.delete("/api/part/:id", checkAuth, checkAdmin, partController.delete);

  // product routes
  router.get("/api/product", checkAuth, productController.getAll);
  router.get("/api/product/:id", checkAuth, productController.getOne);
  router.post(
    "/api/product",
    checkAuth,
    checkAdmin,
    productController.saveProductWithBlueprints
  );
  router.put("/api/product", checkAuth, checkAdmin, productController.update);
  router.delete(
    "/api/product/:id",
    checkAuth,
    checkAdmin,
    productController.delete
  );
  router.get(
    "/api/part/:id/blueprint",
    checkAuth,
    productController.getBlueprintByProduct
  );

  // blueprint routes
  router.get("/api/blueprint", checkAuth, blueprintController.getAll);
  router.get("/api/blueprint/:id", checkAuth, blueprintController.getOne);
  router.post(
    "/api/blueprint",
    checkAuth,
    checkAdmin,
    blueprintController.create
  );
  router.put(
    "/api/blueprint",
    checkAuth,
    checkAdmin,
    blueprintController.update
  );
  router.delete(
    "/api/blueprint/:id",
    checkAuth,
    checkAdmin,
    blueprintController.delete
  );

  // customer routes
  router.get("/api/customer", checkAuth, customerController.getAll);
  router.get("/api/customer/:id", checkAuth, customerController.getOne);
  router.post(
    "/api/customer",
    checkAuth,
    checkAdmin,
    customerController.create
  );
  router.put("/api/customer", checkAuth, checkAdmin, customerController.update);
  router.delete(
    "/api/customer/:id",
    checkAuth,
    checkAdmin,
    customerController.delete
  );

  // order routes
  router.get("/api/order", checkAuth, orderController.getAll);
  router.get("/api/order/:id", checkAuth, orderController.getOne);
  router.post("/api/order", checkAuth, checkAdmin, orderController.create);
  router.put("/api/order", checkAuth, checkAdmin, orderController.update);
  router.delete(
    "/api/order/:id",
    checkAuth,
    checkAdmin,
    orderController.delete
  );

  // user routes
  router.post("/api/register", checkAdmin, userController.register);
  router.post("/api/login", checkAdmin, userController.login);

  return router;
}
