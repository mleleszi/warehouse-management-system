import { createQueryBuilder, getManager, getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Order } from "../entity/Order";
import { Customer } from "../entity/Customer";
import { Product } from "../entity/Product";
import { OrderedProducts } from "../entity/OrderedProducts";
import { PartController } from "./part.controller";
import { BlueprintController } from "./blueprint.controller";

export class OrderController extends Controller {
  orderRepository = getRepository(Order);
  customerRepository = getRepository(Customer);
  orderedProductsRepository = getRepository(OrderedProducts);
  partController = new PartController();
  bluePrintController = new BlueprintController();

  override create = async (req, res) => {
    const customerId = req.body.customerId;
    const products = req.body.products;
    const order = this.orderRepository.create({ customerId });

    const stock = await this.partController.getStock();
    try {
      /*
      await products.forEach(async (product) => {
        const blueprints =
          await this.bluePrintController.getBlueprintsByProduct(product.id);

         blueprints.forEach(async (blueprint) => {
          if (
            stock.get(blueprint.partId) -
              product.quantity * blueprint.quantity <
            0
          ) {
            throw new Error("not enough parts in stock");
          } else {
            await this.partController.setStock(
              blueprint.partId,
              stock.get(blueprint.partId) -
                product.quantity * blueprint.quantity
            );
          }
        });
      });

  */
      for (const product of products) {
        const blueprints =
          await this.bluePrintController.getBlueprintsByProduct(product.id);

        for (const blueprint of blueprints) {
          if (
            stock.get(blueprint.partId) -
              product.quantity * blueprint.quantity <
            0
          ) {
            return res
              .status(400)
              .json({ message: "not enough parts in stock" });
          } else {
            await this.partController.setStock(
              blueprint.partId,
              stock.get(blueprint.partId) -
                product.quantity * blueprint.quantity
            );
          }
        }
      }

      const orderInserted = await this.orderRepository.save(order);

      for (const product of products) {
        const orderedProduct = this.orderedProductsRepository.create({
          orderId: orderInserted.id,
          productId: product.id,
          quantity: product.quantity,
        });
        await this.orderedProductsRepository.save(orderedProduct);
      }

      res.status(200).json({ message: "successful order" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  override getAll = async (req, res) => {
    try {
      /*
      const products = await this.orderRepository.find({
        relations: ["customer", "orderedProducts"],
      });

       */

      const data = await this.orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.orderedProducts", "orderedProducts")
        .leftJoinAndSelect("orderedProducts.product", "product")
        .select([
          "order.id",
          "order.orderDate",
          "order.customerId",
          "orderedProducts.productId",
          "orderedProducts.quantity",
          "product.name",
        ])
        .getMany();

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
