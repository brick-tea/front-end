import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
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
import { TradeService, OrderForm } from 'src/app/service/trade.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-info-dialog',
  templateUrl: './product-info-dialog.html',
  styleUrls: ['./product-info-dialog.scss'],
})
export class ProductInfoDialog implements OnInit {
  product!: ProductInfo;
  isLoad: boolean = false;
  imageNum: number = 0;
  isChanged: boolean = false;

  /** viewer role */
  user: string = this.userService.catchUserAccount();

  constructor(
    private userService: UserService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData,
    public dialog: MatDialog,
    private renderer: Renderer2
  ) {
    renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      // 如果使用者點擊的目標是 Dialog 的背景，則關閉 Dialog 並返回值
      if (target.classList.contains('cdk-overlay-backdrop')) {
        this.dialogRef.close(this.isChanged);
      }
    });
  }

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
      if (res !== undefined) {
        this.product = res; // res: ProductInfo
        this.isChanged = true;
      }
    });
  }
  onDelete() {
    if (confirm('確定刪除商品？')) {
      this.productService.deleteProduct(this.product.productId).subscribe(
        (res) => {
          alert('商品已刪除');
          this.isChanged = true;
          this.dialogRef.close(this.isChanged);
        },
        (err) => {
          console.log(err);
          alert('刪除失敗！');
        }
      );
    }
  }
  order(productId: string) {
    const MatDialogRef = this.dialog.open(OrderProductDialog, {
      width: '20rem',
      height: '20rem',
      disableClose: false,
      data: {
        ordered: false,
        productId: this.product.productId,
      },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      // res.ordered: is user order product
      if (res) {
        console.log(res);
        this.product.sellStatus = 'pending';
      }
    });
  }
}

export interface InfoDialogData {
  product: ProductInfo;
}

@Component({
  selector: 'order-product-dialog',
  templateUrl: 'order-product-dialog.html',
})
export class OrderProductDialog {
  constructor(
    public dialogRef: MatDialogRef<OrderProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDialogData,
    private trade: TradeService,
    private fb: FormBuilder
  ) {}
  orderForm: FormGroup = this.fb.group({
    contact: ['', Validators.required],
    note: ['', Validators.maxLength(30)],
  });
  isSending: boolean = false;
  isFailure: boolean = false;
  onSubmit(): void {
    this.isSending = true;
    const form: OrderForm = {
      productId: this.data.productId,
      contact: this.orderForm.value.contact ?? '',
      note: this.orderForm.value.note ?? '',
    };
    this.trade.orderProduct(form).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (err) => {
        this.isFailure = true;
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}

interface OrderDialogData {
  productId: string;
  ordered: boolean;
}
/**{
  "productId": "string",
  "contact": "string",
  "note": "string"
} */
