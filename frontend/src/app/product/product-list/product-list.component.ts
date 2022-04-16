import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import Product from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  isLoading = false;
  userIsAuthenticated = false;
  displayedColumns: string[] = ['id', 'name', 'operations'];
  private productsSubscription: Subscription;
  private authListenerSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts();
    this.productsSubscription = this.productService
      .getProductsUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.products = data.products.sort((a, b) => a.id - b.id);
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(productId: number) {
    this.isLoading = true;
    this.productService.deleteProduct(productId).subscribe(() => {
      this.productService.getProducts();
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }
}
