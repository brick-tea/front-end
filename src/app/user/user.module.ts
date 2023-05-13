import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { OrderManageComponent } from './order-manage/order-manage.component';

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    ProductManageComponent,
    OrderManageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    MatGridListModule,
    MatPaginatorModule,
    LayoutModule,
  ],
})
export class UserModule {}
