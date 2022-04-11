import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blueprint } from "./Blueprint";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Blueprint, (blueprint) => blueprint.part)
  blueprints: Blueprint[];
}
