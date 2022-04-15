import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Blueprint } from "./Blueprint";
import { Order } from "./Order";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "phone_num" })
  phoneNum: string;

  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
