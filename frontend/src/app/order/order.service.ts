import { Injectable } from '@angular/core';
import Product from '../product/product.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ProductCreateDto from '../product/product-create.dto';
import OrderCreateDto from './order-create.dto';
import Part from '../part/part.model';
import { OrderDto } from './order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: OrderDto[];
  private ordersUpdated = new Subject<{ orders: OrderDto[] }>();

  constructor(private http: HttpClient) {}

  getOrdersUpdatedListener() {
    return this.ordersUpdated;
  }

  getOrders() {
    this.http
      .get<OrderDto[]>('http://localhost:8080/api/order')
      .subscribe((data) => {
        this.orders = data;
        this.ordersUpdated.next({ orders: [...this.orders] });
      });
  }

  createOrder(orderCreateDto: OrderCreateDto) {
    return this.http.post('http://localhost:8080/api/order/', orderCreateDto);
  }
}
