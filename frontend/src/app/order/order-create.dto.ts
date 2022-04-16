import Product from '../product/product.model';

export default interface OrderCreateDto {
  customerId: number;
  products: Product[];
}
