import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Blueprint } from "../entity/Blueprint";

export class BlueprintController extends Controller {
  repository = getRepository(Blueprint);
}
