import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import {
  ProductService,
  Product,
  ProductTag,
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
  fakeTags: ProductTag[] = [
    {
      tagName: 'foo',
      id: 1,
    },
    {
      tagName: 'foo1',
      id: 2,
    },
  ];

  ngOnInit() {}

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
        alert('成功發布！');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNoClick() {
    if (confirm('Are you sure?')) this.dialogRef.close();
  }
}
