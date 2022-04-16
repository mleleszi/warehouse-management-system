import { Injectable } from '@angular/core';
import Part from '../part/part.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ProductCreateDto from './product-create.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productCreateDto: ProductCreateDto = {
    name: 'product',
    blueprints: [
      { partId: 16, quantity: 10 },
      { partId: 19, quantity: 15 },
    ],
  };

  constructor(private http: HttpClient, private router: Router) {}

  createPart(productCreateDto: ProductCreateDto) {
    return this.http.post(
      'http://localhost:8080/api/product/',
      productCreateDto
    );
  }
}
