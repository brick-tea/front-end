import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {
  ProductService,
  Product,
  ProductTag,
  ProductInfo,
  ProductImage,
  ProductUpdate,
} from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.html',
  styleUrls: ['./create-product-dialog.scss'],
})
export class CreateProductDialog implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CreateProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  productBox: Product = {
    title: '',
    content: '',
    status: 'selling',
    price: 0,
    tagName: '',
  };
  productSellStatus: boolean = false;

  productForm!: FormGroup;

  tags: ProductTag[] = [];
  isCreated?: boolean = false; // is edit mode or create mode
  isSending: boolean = false; // is waiting for api response
  isFailure: boolean = false;

  ngOnInit() {
    if (this.data) {
      /// in edit mode
      this.isCreated = true;
      this.productBox = this.data.product as Product;
      this.productSellStatus = this.data.product.sellStatus;
    } else {
      for (let i = 0; i < 3; i++) {
        this.productImages.push({ ...this.initImage });
      }
    }
    this.productForm = this.fb.group({
      title: [this.productBox.title, Validators.required],
      content: [this.productBox.content, Validators.required],
      status: [this.productBox.status, Validators.required],
      price: [this.productBox.price, Validators.required],
      tagName: [this.productBox.tagName],
    });
    this.productService
      .getTags()
      .subscribe((res: ProductTag[]) => (this.tags = res));
  }

  selectTag(tag: string) {
    if (tag !== this.productForm.value.tagName)
      this.productForm.patchValue({ tagName: tag });
    else this.productForm.patchValue({ tagName: '' });
    console.log(this.productForm.value);
  }

  product: Product = {
    //  product to post
    title: '',
    content: '',
    status: '',
    price: 0,
    tagName: '',
  };

  /**  Create image  **/

  initImage: Image = {
    name: '',
    img: undefined,
  };
  productImages: Image[] = [];

  onImageUpload(i: number, event: any) {
    // chose image
    const file: File = event.target.files[0];
    if (file.size > 3 * 1024 * 1024) {
      alert('limit image size 3mb!');
      return;
    }
    this.productImages[i].img = file;
    this.productImages[i].name = file.name;
    console.log(this.productImages);
  }
  onImageRemove(i: number): void {
    this.productImages[i] = { ...this.initImage };
  }

  packImage(id: string): FormData {
    const formData = new FormData();
    formData.append('productId', id);
    for (let i = 0; i < this.productImages.length; i++) {
      if (this.productImages[i].img !== undefined) {
        formData.append('images', this.productImages[i].img as Blob);
      } else
        formData.append(
          'images',
          new File([], '', { type: 'image/jpeg' }) as Blob
        );
    }
    return formData;
  }

  isImageCreated?: boolean = false;
  productId: string = '';

  createProduct(): void {
    this.isSending = true;
    this.product = {
      title: this.productForm.value.title ?? '',
      content: this.productForm.value.content ?? '',
      status: this.productForm.value.status ?? 'selling',
      price: this.productForm.value.price ?? 0,
      tagName: this.productForm.value.tagName ?? '',
    };
    console.log(this.product);
    if (this.isCreated === true) {
      this.updateProduct();
    } else {
      this.productService.createProduct(this.product).subscribe(
        (res) => {
          console.log(res);
          this.productId = res.productId;
          this.uploadImage(this.packImage(res.productId));
          // this.dialogRef.close();
          this.isCreated = true;
        },
        (err) => {
          console.log(err);
          this.isCreated = false;
          this.isSending = false;
          this.isFailure = true;
        }
      );
    }
  }

  uploadImage(packedImage: FormData) {
    this.productService.createProductImage(packedImage).subscribe(
      (res) => {
        console.log(res);
        alert('發布成功！');
        location.reload();
        this.dialogRef.close(this.productId);
        this.isImageCreated = true;
      },
      (err) => {
        console.log(err);
        this.isCreated = false;
        this.isSending = false;
        this.isFailure = true;
      }
    );
  }
  updateProduct() {
    const updateData: ProductUpdate = {
      sellStatus: this.productSellStatus,
      ...this.product,
    };

    this.productService
      .updateProduct(updateData, this.data.productId)
      .subscribe(
        (res) => {
          console.log(res);
          alert('更新成功！');
          this.dialogRef.close(res);
        },
        (err) => {
          console.log(err);
          this.isCreated = false;
          this.isSending = false;
          this.isFailure = true;
        }
      );
  }

  onNoClick() {
    if (confirm('你要確定ㄟ')) this.dialogRef.close();
  }
}

interface Image {
  name: string;
  img?: File;
}

interface DialogData {
  product: ProductUpdate;
  productId: string;
}
