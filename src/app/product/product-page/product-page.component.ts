import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { ProductService, ProductInfo } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductInfoDialog } from './product-info-dialog/product-info-dialog';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: UserAuthService,
    private productService: ProductService
  ) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }

  allProducts$: Observable<ProductInfo[]> =
    this.productService.getAllProducts();
  loadProductList() {
    this.productService.getAllProducts().subscribe((res) => console.log(res));
  }

  expandProduct(product: ProductInfo) {
    const MatDialogRef = this.dialog.open(ProductInfoDialog, {
      height: '40rem',
      width: '40rem',
      disableClose: false,
      data: { product: product },
    });
  }
}

/** Grid List Example */
/*tiles: Tile[] = [
  { text: 'One', cols: 1, rows: 5, color: 'lightblue' },
  { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
  { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
  { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
  { text: 'Five', cols: 1, rows: 3, color: '#485795' },
];*/
/*interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}*/
