import { createQueryBuilder, getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Product } from "../entity/Product";
import { Blueprint } from "../entity/Blueprint";

export class ProductController extends Controller {
  repository = getRepository(Product);

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
}
