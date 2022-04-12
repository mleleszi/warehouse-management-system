import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Customer } from "../entity/Customer";

export class CustomerController extends Controller {
  repository = getRepository(Customer);
}
