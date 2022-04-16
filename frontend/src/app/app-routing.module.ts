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

const routes: Routes = [
  { path: 'parts', component: PartListComponent, canActivate: [AuthGuard] },
  {
    path: 'parts/create',
    component: PartCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'parts/edit/:partId',
    component: PartCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/create',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/edit/:customerId',
    component: CustomerCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/create',
    component: OrderCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
