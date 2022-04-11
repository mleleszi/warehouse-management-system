import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Product } from "../entity/Product";

export class ProductController extends Controller {
  repository = getRepository(Product);
}
