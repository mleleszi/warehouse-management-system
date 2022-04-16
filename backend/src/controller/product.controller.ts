import { createQueryBuilder, getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Product } from "../entity/Product";
import { Blueprint } from "../entity/Blueprint";

export class ProductController extends Controller {
  repository = getRepository(Product);
  blueprintRepository = getRepository(Blueprint);

  getBlueprintByProduct = async (req, res) => {
    const entityId = req.params.id;

    try {
      const entity = await this.repository.findOne({ where: { id: entityId } });
      if (!entity) {
        return res.status(404).json({ message: "not found" });
      }

      const blueprints = await createQueryBuilder("blueprint")
        .select("blueprint")
        .from(Blueprint, "blueprint")
        .innerJoinAndSelect("blueprint.part", "part")
        .where("blueprint.part = :part", { product: entityId })
        .getMany();

      console.log(blueprints);

      res.json(blueprints);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };

  saveProductWithBlueprints = async (req, res) => {
    const product = this.repository.create({ name: req.body.name });
    let blueprints = req.body.blueprints;

    try {
      const productInserted = await this.repository.save(product);
      blueprints.forEach(async (item) => {
        const blueprint = this.blueprintRepository.create({
          partId: item.partId,
          productId: productInserted.id,
          quantity: item.quantity,
        });
        await this.blueprintRepository.save(blueprint);
      });

      res.status(200).json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
