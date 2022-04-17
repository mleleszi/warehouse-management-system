import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { OrderedProducts } from "./OrderedProducts";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "order_date" })
  orderDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @Column({ name: "customer_id" })
  customerId: number;

  @OneToMany(() => OrderedProducts, (orderedProducts) => orderedProducts.order)
  orderedProducts: OrderedProducts[];
}
