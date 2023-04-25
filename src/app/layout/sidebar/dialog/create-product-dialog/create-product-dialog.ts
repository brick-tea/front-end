import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.html',
  styleUrls: ['./create-product-dialog.scss'],
})
export class CreateProductDialog implements OnInit {
  constructor(
    private product: ProductService,
    public dialogRef: MatDialogRef<CreateProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  proudctList: any;

  ngOnInit() {
    console.log('data:');
    console.log(this.data);

    this.product.getMyProducts().subscribe(
      (res) => {
        this.proudctList = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

export class DialogData {
  title: string = '';
  content: string = '';
  status: string = '';
  productId: string[] = [];
}
