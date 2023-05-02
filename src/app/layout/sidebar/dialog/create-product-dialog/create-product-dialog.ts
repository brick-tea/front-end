import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import {
  ProductService,
  Product,
  ProductTag,
  ProductImage,
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
    public dialogRef: MatDialogRef<CreateProductDialog>
  ) {}

  productForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    status: ['selling', Validators.required],
    price: [0, Validators.required],
    tagName: [''],
  });

  tags$ = this.productService.getTags();

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.productImages.push({ ...this.initImage });
    }
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
    const file: File = event.target.files[0];
    this.productImages[i].img = file;
    /*const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result)
        this.productImages[i].file = (reader.result as string)
          .split(',')
          .pop()!;
    };*/

    this.productImages[i].name = file.name;
  }
  onImageRemove(i: number): void {
    this.productImages[i] = { ...this.initImage };
  }

  packImage(id: string): FormData {
    const formData = new FormData();
    formData.append('productId', id);
    for (let i = 0; i < this.productImages.length; i++) {
      formData.append('images', this.productImages[i].img as Blob);
    }
    let productImages: ProductImage = {
      productId: id,
      images: [],
    };
    for (let i = 0; i < this.productImages.length; i++) {
      if (this.productImages[i].name !== '')
        productImages.images.push(this.productImages[i].img!);
    }

    return formData;
  }

  isCreated?: boolean = true;
  createProduct(): void {
    this.product = {
      title: this.productForm.value.title ?? '',
      content: this.productForm.value.content ?? '',
      status: this.productForm.value.status ?? 'selling',
      price: this.productForm.value.price ?? 0,
      tagName: this.productForm.value.tagName ?? '',
    };
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe(
      (res) => {
        console.log(res);
        this.packImage(res);
        this.uploadImage(this.packImage(res));
        // this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.isCreated = false;
      }
    );
  }

  uploadImage(packedImage: FormData) {
    this.productService.createProductImage(packedImage).subscribe(
      (res) => {
        console.log(res);
        alert('發布成功！');
        this.dialogRef.close();
      },
      (err) => {
        console.log(err);
        this.isCreated = false;
      }
    );
  }

  onNoClick() {
    if (confirm('Are you sure?')) this.dialogRef.close();
  }
}

interface Image {
  name: string;
  img?: File;
}
