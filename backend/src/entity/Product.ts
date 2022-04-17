import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blueprint } from "./Blueprint";
import { Order } from "./Order";
import { OrderedProducts } from "./OrderedProducts";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Blueprint, (blueprint) => blueprint.product)
  blueprints: Blueprint[];

  @OneToMany(
    () => OrderedProducts,
    (orderedProducts) => orderedProducts.product
  )
  orderedProducts: OrderedProducts[];
}
