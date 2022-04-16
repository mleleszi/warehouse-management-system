import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ProductCreateDto from './product-create.dto';
import Product from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[];
  private productsUpdated = new Subject<{ products: Product[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProductsUpdatedListener() {
    return this.productsUpdated;
  }

  createPart(productCreateDto: ProductCreateDto) {
    return this.http.post(
      'http://localhost:8080/api/product/',
      productCreateDto
    );
  }

  getProducts() {
    this.http
      .get<Product[]>('http://localhost:8080/api/product')
      .subscribe((data) => {
        this.products = data;
        this.productsUpdated.next({ products: [...this.products] });
      });
  }

  deleteProduct(id: number) {
    return this.http.delete('http://localhost:8080/api/product/' + id);
  }
}
