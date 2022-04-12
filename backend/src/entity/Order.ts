import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Product } from "./Product";
import { Customer } from "./Customer";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "order_date" })
  orderDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @ManyToMany(() => Product)
  @JoinTable({
    name: "ordered_products",
    joinColumn: {
      name: "order_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
  })
  products: Product[];
}
