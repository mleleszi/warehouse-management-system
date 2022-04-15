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

  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Blueprint, (blueprint) => blueprint.part)
  blueprints: Blueprint[];
}
