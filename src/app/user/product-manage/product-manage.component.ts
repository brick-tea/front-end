import { Component, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { DataService } from 'src/app/service/data.service';
import {
  ProductService,
  ProductInfo,
  ProductList,
} from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductInfoDialog } from 'src/app/product/product-page/product-info-dialog/product-info-dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.scss'],
})
export class ProductManageComponent {
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
  isLoading = false;
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
    this.isLoading = true;
    this.productService.getMyProducts().subscribe(
      (res) => {
        console.log(res);
        this.allProducts = res;
        this.viewProducts = res;
        this.totalProductNum = res.length;
        this.isLoading = false;
      },
      (err) => {
        console.error(err);
        if (err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
        this.isLoading = false;
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
