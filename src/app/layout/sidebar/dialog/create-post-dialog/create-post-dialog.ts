import { Product } from './../../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostsService, Post } from 'src/app/service/posts.service';
import { ProductService, ProductInfo } from 'src/app/service/product.service';
import { Observable, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.html',
  styleUrls: ['./create-post-dialog.scss'],
})
export class CreatePostDialog implements OnInit {
  constructor(
    private product: ProductService,
    private postsService: PostsService,
    public dialogRef: MatDialogRef<CreatePostDialog>
  ) {}
  proudctList: ProductEssansial[] = [];
  isSelectProduct: boolean[] = [];
  isProductLoad: boolean = false;
  myProducts$: Observable<ProductInfo[]> = this.product.getMyProducts().pipe(
    tap((products) => {
      this.proudctList = [];
      for (let { productId: id, title: name } of products) {
        this.proudctList.push({
          productId: id,
          title: name,
        } as ProductEssansial);
      }

      console.log(this.proudctList);
      this.isProductLoad = true;
    })
  );
  ngOnInit(): void {}

  post: Post = {
    title: '',
    content: '',
    status: '',
    productsId: [],
  };

  onSubmit() {
    this.postsService.addPost(this.post).subscribe(
      (res) => {
        console.log(res);
        alert('成功發布！');
      },
      (err) => {
        console.log(err);
        if (err.status === 403) {
        }
      }
    );
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

interface ProductEssansial {
  productId: string;
  title: string;
}
