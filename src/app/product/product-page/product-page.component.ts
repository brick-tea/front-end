import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { DataService } from 'src/app/service/data.service';
import {
  ProductService,
  ProductInfo,
  Product,
  ProductList,
} from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductInfoDialog } from './product-info-dialog/product-info-dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: UserAuthService,
    private productService: ProductService,
    private renderer: Renderer2,
    private dataService: DataService
  ) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }
  totalProductNum: number = 0;
  productOfPage: number = 21;
  ngOnInit() {
    this.loadProductList();
    this.dataService.getProductResults().subscribe((data) => {
      if (data.product.length > 0) {
        this.viewProducts = data.product;
        this.totalProductNum = data.totalNumber;
      } else this.viewProducts = this.allProducts;
    });
  }
  allProducts: ProductInfo[] = []; // all products
  viewProducts: ProductInfo[] = []; // display all products or search products

  loadProductList(page?: number) {
    this.productService.getAllProducts(page).subscribe(
      (res) => {
        console.log(res);
        this.allProducts = res.product;
        this.viewProducts = res.product;
        this.totalProductNum = res.totalNumber;
      },
      (err) => {
        console.error(err);
        if (err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  expandProduct(product: ProductInfo) {
    const MatDialogRef = this.dialog.open(ProductInfoDialog, {
      height: '40rem',
      width: '40rem',
      disableClose: true,
      data: { product: product },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadProductList();
      }
    });
  }
  onPageChange(e: PageEvent) {
    console.log(e);
    this.loadProductList(e.pageIndex);
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
