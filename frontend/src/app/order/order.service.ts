import { Injectable } from '@angular/core';
import Product from '../product/product.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ProductCreateDto from '../product/product-create.dto';
import OrderCreateDto from './order-create.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(orderCreateDto: OrderCreateDto) {
    return this.http.post('http://localhost:8080/api/order/', orderCreateDto);
  }
}
