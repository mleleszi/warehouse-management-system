import { Component, OnInit } from '@angular/core';
import Customer from '../../customer/customer.model';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../customer/customer.service';
import { AuthService } from '../../auth/auth.service';
import { ProductService } from '../../product/product.service';
import OrderCreateDto from '../order-create.dto';
import { NgForm } from '@angular/forms';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  customers: Customer[];
  products: { id: number; name: string; added: number }[];
  selectedCustomer: Customer;

  isLoading = false;
  userIsAuthenticated = false;
  private customerSubscription: Subscription;
  private productsSubscription: Subscription;
  private authListenerSubscription: Subscription;
  displayedColumns: string[] = ['id', 'name', 'operations'];

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.customerService.getCustomers();
    this.customerSubscription = this.customerService
      .getCustomersUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.customers = data.customers.sort((a, b) => a.id - b.id);
      });

    this.productService.getProducts();
    this.productsSubscription = this.productService
      .getProductsUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.products = [];
        data.products
          .sort((a, b) => a.id - b.id)
          .forEach((part) => {
            this.products.push({ id: part.id, name: part.name, added: 0 });
            console.log(part);
          });
      });
  }

  onSaveOrder(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.selectedCustomer = form.value.selectedCustomer;

    const products = this.products
      .filter((product) => product.added !== 0)
      .map((product) => {
        return { id: product.id, quantity: product.added };
      });
    const orderCreateDto = {
      customerId: this.selectedCustomer.id,
      products,
    };

    this.orderService.createOrder(orderCreateDto).subscribe(() => {
      this.isLoading = false;
    });

    this.products.forEach((product) => {
      product.added = 0;
    });

    form.resetForm();
    this.router.navigate(['orders']);
  }

  increment(part: { id: number; name: string; added: number }) {
    part.added++;
  }

  decrement(part: { id: number; name: string; added: number }) {
    if (part.added <= 0) return;
    part.added--;
  }

  ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
  }
}
