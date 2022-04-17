export default interface OrderCreateDto {
  customerId: number;
  products: { id: number; quantity: number }[];
}
