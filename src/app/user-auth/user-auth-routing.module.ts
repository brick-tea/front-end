import { UserAuthComponent } from './user-auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const USER_AUTH_ROUTES: Routes = [
  {
    path: '',
    component: UserAuthComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../product/product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(USER_AUTH_ROUTES)],
  exports: [RouterModule],
})
export class UserAuthRoutingModule {}
