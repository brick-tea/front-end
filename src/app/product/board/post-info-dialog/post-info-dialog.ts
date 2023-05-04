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
import { PostsService, Post, PostInfo } from 'src/app/service/posts.service';
import { CreatePostDialog } from 'src/app/layout/sidebar/dialog/create-post-dialog/create-post-dialog';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-post-info-dialog',
  templateUrl: './post-info-dialog.html',
  styleUrls: ['./post-info-dialog.scss'],
})
export class PostInfoDialog implements OnInit {
  constructor(
    private userService: UserService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<PostInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private renderer: Renderer2
  ) {
    renderer.listen('window', 'click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cdk-overlay-backdrop')) {
        this.dialogRef.close(this.isChanged);
      }
    });
  }
  user: string = this.userService.catchUserAccount();
  post!: PostInfo;
  isLoad: boolean = false;
  imageNum: number = 0;
  isChanged: boolean = false;

  ngOnInit() {
    console.log(this.data);
    this.post = this.data.post;
    this.isLoad = true;
  }
  onEdit() {
    const MatDialogRef = this.dialog.open(CreatePostDialog, {
      width: '40rem',
      height: '35rem',
      disableClose: true,
      data: {
        post: this.post,
        productId: this.post.postId,
      },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      this.post = Object.assign(this.post, res);
      this.isChanged = true;
    });
  }
  onDelete() {
    if (confirm('確定刪除商品？')) {
      this.productService.deleteProduct(this.post.postId).subscribe(
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
}

interface DialogData {
  post: PostInfo;
}
