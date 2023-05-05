import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<CreatePostDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData
  ) {}
  isEdit: boolean = false; // create or update
  proudctList: ProductEssansial[] = [];
  isSelectProduct: boolean[] = [];
  isProductLoad: boolean = false;

  post: Post = {
    title: '',
    content: '',
    status: '',
    productsId: [],
  };
  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.post = this.data.post;
    }
    this.product.getMyProducts().subscribe(
      (products) => {
        this.proudctList = [];
        for (let { productId: id, title: name } of products) {
          this.proudctList.push({
            productId: id,
            title: name,
          } as ProductEssansial);
        }
        if (this.isEdit) {
          for (let i = 0; i < this.post.productsId.length; i++) {
            for (let j = 0; j < this.proudctList.length; j++) {
              if (this.post.productsId[i] === this.proudctList[j].productId) {
                this.isSelectProduct[j] = true;
              }
            }
          }
        }

        console.log(this.proudctList);
        this.isProductLoad = true;
      },
      (err) => console.log(err)
    );
  }

  debug() {
    console.log(this.isSelectProduct);
  }
  isSending: boolean = false;
  onSubmit() {
    this.isSending = true;
    this.post.productsId = [];
    console.log(this.isSelectProduct);
    for (let i = 0; i < this.proudctList.length; i++) {
      if (this.isSelectProduct[i]) {
        this.post.productsId.push(this.proudctList[i].productId);
      }
    }
    console.log(this.post);
    if (this.isEdit) {
      this.postsService.editPost(this.data.postId, this.post).subscribe(
        () => {
          alert('成功更新！');
          this.dialogRef.close(true);
        },
        (err) => {
          console.log(err);
          this.isSending = false;
        }
      );
    } else {
      this.postsService.createPost(this.post).subscribe(
        (res) => {
          console.log(res);
          alert('成功發布！');
          this.dialogRef.close(res);
        },
        (err) => {
          console.log(err);
          this.isSending = false;
          alert('發布失敗，請重試！');
          if (err.status === 403) {
          }
        }
      );
    }
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
interface ProductEssansial {
  productId: string;
  title: string;
}
interface MatDialogData {
  postId: string;
  post: Post;
}

/** for async pipe version */
/*myProducts$: Observable<ProductInfo[]> = this.product.getMyProducts().pipe(
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
);*/
