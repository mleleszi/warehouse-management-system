import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderDto } from '../order.dto';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../order.service';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: OrderDto[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private ordersSubscription: Subscription;
  private authListenerSubscription: Subscription;
  displayedColumns: string[] = ['name', 'quantity'];
  displayedCustomerColumns: string[] = ['name', 'value'];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.orderService.getOrders();
    this.ordersSubscription = this.orderService
      .getOrdersUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.orders = data.orders;
        console.log(this.orders);
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }
}
