import { Part } from "./Part";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderedProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ name: "product_id", type: "int" })
  productId: number;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column({ name: "order_id", type: "int" })
  orderId: number;

  @Column()
  quantity: number;
}
