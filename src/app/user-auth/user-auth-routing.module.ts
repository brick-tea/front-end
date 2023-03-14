import { UserAuthComponent } from './user-auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const USER_AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    component: UserAuthComponent,
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
