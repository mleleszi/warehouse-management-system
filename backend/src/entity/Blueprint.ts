import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "./Product";
import { Part } from "./Part";

@Entity()
export class Blueprint {
  @PrimaryColumn({ type: "int", name: "part_id" })
  @ManyToOne(() => Part, (part) => part.id)
  @JoinColumn({ name: "part_id" })
  part: Part;

  @PrimaryColumn({ type: "int", name: "product_id" })
  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  quantity: number;
}
