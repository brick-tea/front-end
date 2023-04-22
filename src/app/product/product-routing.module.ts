import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  },
  {
    path: 'board',
    component: BoardComponent,
  },
  {
    path: 'products',
    component: ProductPageComponent,
  },
  {
    path: '**',
    redirectTo: 'board',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
