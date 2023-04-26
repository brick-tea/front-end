import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostsService, Post } from 'src/app/service/posts.service';
import { ProductService, Product } from 'src/app/service/product.service';

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
  proudctList: Product[] = [];

  post: Post = {
    title: '',
    content: '',
    status: '',
    productsId: [],
  };

  ngOnInit() {
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
