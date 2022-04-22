import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PartListComponent } from './part/part-list/part-list.component';
import { PartCreateComponent } from './part/part-create/part-create.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer/customer-create/customer-create.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderCreateComponent } from './order/order-create/order-create.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: 'parts', component: PartListComponent, canActivate: [AuthGuard] },
  {
    path: 'parts/create',
    component: PartCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'parts/edit/:partId',
    component: PartCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'customers/edit/:customerId',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/create',
    component: OrderCreateComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule {}
