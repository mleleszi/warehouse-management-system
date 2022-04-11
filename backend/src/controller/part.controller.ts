import { getRepository } from "typeorm";
import { Part } from "../entity/Part";
import { Controller } from "./base.controller";

export class PartController extends Controller {
  repository = getRepository(Part);
}
