import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Order } from "../entity/Order";

export class OrderController extends Controller {
  repository = getRepository(Order);
}
