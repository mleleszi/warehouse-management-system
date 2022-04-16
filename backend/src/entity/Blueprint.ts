import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Part } from "./Part";

@Entity()
export class Blueprint {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Part, (part) => part.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "part_id" })
  part: Part;

  @Column({ name: "part_id", type: "int" })
  partId: number;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "product_id", type: "int" })
  productId: number;

  @Column()
  quantity: number;
}
