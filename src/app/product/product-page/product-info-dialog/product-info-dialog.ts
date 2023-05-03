import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductService, ProductInfo } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-info-dialog',
  templateUrl: './product-info-dialog.html',
  styleUrls: ['./product-info-dialog.scss'],
})
export class ProductInfoDialog implements OnInit {
  product!: ProductInfo;
  isLoad: boolean = false;
  imageNum: number = 0;

  constructor(
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
  selectType(type: string) {
    this.dialogRef.close();
  }
}

export interface DialogData {
  product: ProductInfo;
}
