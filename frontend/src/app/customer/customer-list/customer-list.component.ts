import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import Part from '../customer.model';
import Customer from '../customer.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[];
  isLoading = false;
  userIsAuthenticated = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phoneNum',
    'address',
    'operations',
  ];
  private customerSubscription: Subscription;
  private authListenerSubscription: Subscription;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.customerService.getCustomers();
    this.customerSubscription = this.customerService
      .getCustomersUpdatedListener()
      .subscribe((data) => {
        this.isLoading = false;
        this.customers = data.customers.sort((a, b) => a.id - b.id);
      });
    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(customerId: string) {
    this.isLoading = true;
    this.customerService.deleteCustomer(customerId).subscribe(() => {
      this.customerService.getCustomers();
    });
  }

  ngOnDestroy(): void {
    this.customerSubscription.unsubscribe();
    this.authListenerSubscription.unsubscribe();
  }
}
