import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { PartListComponent } from './part/part-list/part-list.component';
import { PartCreateComponent } from './part/part-create/part-create.component';

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
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
