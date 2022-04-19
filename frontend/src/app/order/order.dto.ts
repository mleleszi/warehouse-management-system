import Customer from '../customer/customer.model';

export interface OrderDto {
  id: number;
  orderDate: Date;
  customers: Customer[];
  orderedProducts: {
    productId: number;
    quantity: number;
    product: { name: string }[];
  }[];
}
