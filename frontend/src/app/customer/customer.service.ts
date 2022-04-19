import { Injectable } from '@angular/core';
import Part from './customer.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Customer from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: Customer[];
  private customersUpdated = new Subject<{ customers: Customer[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getCustomersUpdatedListener() {
    return this.customersUpdated;
  }

  getCustomers() {
    this.http
      .get<Customer[]>('http://localhost:8080/api/customer')
      .pipe(
        map((data) => {
          return {
            customers: data.map((customer) => {
              return {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phoneNum: customer.phoneNum,
                address: customer.address,
              };
            }),
          };
        })
      )
      .subscribe((data) => {
        this.customers = data.customers;
        this.customersUpdated.next({ customers: [...this.customers] });
      });
  }

  getCustomer(id: string) {
    return this.http.get<Customer>('http://localhost:8080/api/customer/' + id);
  }

  createCustomer(customer: Customer) {
    customer.id = null;
    this.http
      .post('http://localhost:8080/api/customer/', customer)
      .subscribe((res) => {
        this.router.navigate(['/customers']);
      });
  }

  updateCustomer(customer: Customer) {
    this.http
      .put('http://localhost:8080/api/customer', customer)
      .subscribe((res) => {
        this.router.navigate(['/customers']);
      });
  }

  deleteCustomer(id: string) {
    return this.http.delete('http://localhost:8080/api/customer/' + id);
  }
}
