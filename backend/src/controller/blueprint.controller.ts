import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Blueprint } from "../entity/Blueprint";

export class BlueprintController extends Controller {
  repository = getRepository(Blueprint);

  async getBlueprintsByProduct(productId: number) {
    const blueprints = await this.repository.find({
      where: { productId: productId },
    });
    return blueprints;
  }
}
