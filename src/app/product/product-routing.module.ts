import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';

const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCT_ROUTES)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
