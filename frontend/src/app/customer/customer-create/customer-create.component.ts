import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import Customer from '../customer.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css'],
})
export class CustomerCreateComponent implements OnInit {
  enteredPrice = '';
  customer: Customer;
  isLoading = false;
  private mode = 'create';
  private customerId: string;
  private authStatusSub: Subscription;

  constructor(
    public customerService: CustomerService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.mode = 'edit';
        this.customerId = paramMap.get('customerId');
        this.isLoading = true;
        this.customerService.getCustomer(this.customerId).subscribe((data) => {
          this.isLoading = false;
          this.customer = {
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNum: data.phoneNum,
            address: data.address,
          };
        });
      } else {
        this.mode = 'create';
        this.customerId = null;
      }
    });
  }

  onSaveCustomer(form: NgForm) {
    if (form.invalid) return;

    this.isLoading = true;
    if (this.mode === 'create') {
      this.customerService.createCustomer({
        id: null,
        name: form.value.name,
        email: form.value.email,
        phoneNum: form.value.phoneNum,
        address: form.value.address,
      });
    } else {
      this.customerService.updateCustomer({
        id: this.customer.id,
        name: form.value.name,
        email: form.value.email,
        phoneNum: form.value.phoneNum,
        address: form.value.address,
      });
    }

    form.resetForm();
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
