import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blueprint } from "./Blueprint";
import { Order } from "./Order";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Blueprint, (blueprint) => blueprint.part)
  blueprints: Blueprint[];

  @ManyToMany(() => Order)
  orders: Order[];
}
