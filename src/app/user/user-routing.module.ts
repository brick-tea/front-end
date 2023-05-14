import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { UserComponent } from './user.component';
import { OrderManageComponent } from './order-manage/order-manage.component';

const routes: Routes = [
  {
    path: 'manage',
    component: UserComponent,
    children: [
      {
        path: 'my-product',
        component: ProductManageComponent,
      },
      {
        path: 'my-order',
        component: OrderManageComponent,
      },
      {
        path: '**',
        redirectTo: 'my-order',
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
