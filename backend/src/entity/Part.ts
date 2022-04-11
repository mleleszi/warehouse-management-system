import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Blueprint } from "./Blueprint";

@Entity()
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createAt: Date;

  @OneToMany(() => Blueprint, (blueprint) => blueprint.part)
  blueprints: Blueprint[];
}
