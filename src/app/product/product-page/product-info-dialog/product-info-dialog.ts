import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  ProductService,
  ProductInfo,
  ProductUpdate,
} from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';
import { CreateProductDialog } from 'src/app/layout/sidebar/dialog/create-product-dialog/create-product-dialog';
@Component({
  selector: 'app-product-info-dialog',
  templateUrl: './product-info-dialog.html',
  styleUrls: ['./product-info-dialog.scss'],
})
export class ProductInfoDialog implements OnInit {
  product!: ProductInfo;
  isLoad: boolean = false;
  imageNum: number = 0;

  /** viewer role */
  user: string = this.userService.catchUserAccount();

  constructor(
    private userService: UserService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.product = this.data.product;
    this.isLoad = true;
    if (this.product.image1) this.imageNum++;
    if (this.product.image2) this.imageNum++;
    if (this.product.image3) this.imageNum++;

    /*this.productService.getProduct(this.data.id).subscribe(
      (data: ProductInfo) => {
        this.product = data;
        this.isLoad = true;
      },
      (err) => console.log(err)
    );*/
  }
  onEdit() {
    const MatDialogRef = this.dialog.open(CreateProductDialog, {
      width: '40rem',
      height: '35rem',
      disableClose: true,
      data: {
        product: this.product as ProductUpdate,
        productId: this.product.productId,
      },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.product = Object.assign(this.product, res);
      console.log(this.product);
    });
  }
}

export interface DialogData {
  product: ProductInfo;
}
