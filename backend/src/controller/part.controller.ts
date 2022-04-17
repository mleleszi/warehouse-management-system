import { getRepository } from "typeorm";
import { Part } from "../entity/Part";
import { Controller } from "./base.controller";

export class PartController extends Controller {
  repository = getRepository(Part);

  async getStock() {
    const parts = await this.repository.find();

    let stockMap = new Map<number, number>();
    parts.forEach((part) => {
      stockMap.set(part.id, part.quantity);
    });
    stockMap.forEach((item) => console.log(item));
    return stockMap;
  }

  async setStock(id: number, quantity: number) {
    try {
      const part = await this.repository.findOne({ where: { id } });
      part.quantity = quantity;
      await this.repository.save(part);
    } catch (err) {
      throw new Error("error setting stock");
    }
  }
}
