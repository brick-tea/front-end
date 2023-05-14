/**
 * @description this component is to show all post
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PostsService,
  PostInfo,
  Post,
  Comment,
  CommentInfo,
} from 'src/app/service/posts.service';
import { ProductService, ProductInfo } from 'src/app/service/product.service';
import { UserAuthService } from 'src/app/service/user-auth.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostInfoDialog } from './post-info-dialog/post-info-dialog';
import { UserService } from 'src/app/service/user.service';
import { CreatePostDialog } from 'src/app/layout/sidebar/dialog/create-post-dialog/create-post-dialog';
import { ProductInfoDialog } from 'src/app/product/product-page/product-info-dialog/product-info-dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: UserAuthService,
    private userService: UserService,
    private postsService: PostsService,
    private productService: ProductService
  ) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }
  BEAM_COLORS = '3b3e37,e19563,066699,d39088,f0ddB5'; // avatar colors set
  user: string = this.userService.catchUserAccount();
  allPosts$: Observable<PostInfo[]> = this.postsService.getAllPosts();
  allPosts!: PostWithPrducts[];
  isExpand: boolean[] = [];

  ngOnInit(): void {
    this.loadAllPosts();
  }

  /** Post Operations */
  loadAllPosts() {
    this.postsService.getAllPosts().subscribe(
      (res) => (this.allPosts = res),
      (err) => {
        console.error(err);
        if (err.status === 403) {
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
      }
    );
  }

  loadProductList(index: number) {
    //console.log(this.allPosts[index]);
    if (this.allPosts[index].productsId.length === 0) {
      this.allPosts[index].isLoad = true;
      return;
    }
    this.productService
      .getProductList(this.allPosts[index].productsId)
      .subscribe((res) => {
        this.allPosts[index].productList = res;
        this.allPosts[index].isLoad = true;
      });
  }

  expandAction(i: number) {
    if (this.isExpand[i] === undefined || this.isExpand[i] === false) {
      /** Action */
      if (this.allPosts[i].isLoad !== true) {
        this.loadProductList(i);
      }

      this.isExpand[i] = true;
    } else this.isExpand[i] = false;
  }
  expandProduct(product: ProductInfo, postIndex: number) {
    const MatDialogRef = this.dialog.open(ProductInfoDialog, {
      height: '40rem',
      width: '40rem',
      disableClose: true,
      data: { product: product },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadProductList(postIndex);
      }
    });
  }

  onEdit(postKey: number): void {
    const postId = this.allPosts[postKey].postId;
    let editPostKey: number = this.findPostKey(postId); // check if post exist to avoid unnecessary operation

    const MatDialogRef = this.dialog.open(CreatePostDialog, {
      width: '40rem',
      height: '35rem',
      disableClose: true,
      data: {
        post: this.allPosts[postKey] as Post,
        postId: postId,
      },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      this.loadPost(postId);
    });
  }
  onDelete(key: number): void {
    const postId = this.allPosts[key].postId;
    if (confirm('確定要刪除？')) {
      this.postsService.deletePost(postId).subscribe(
        () => this.loadAllPosts(),
        (err) => console.log(err)
      );
      this.removePost(postId);
      return;
    }
  }

  /** Comment Operations */

  isSending: boolean = false;
  onComment(postKey: number, comment: HTMLInputElement) {
    this.isSending = true;
    const content = comment.value;
    const pack: Comment = { content: content };
    const postId = this.allPosts[postKey].postId;
    this.postsService.createComment(postId, pack).subscribe(
      (res) => {
        this.allPosts[postKey].comment.push(res);
        comment.value = '';
      }, // wait backend changing response body
      (err) => console.error(err),
      () => (this.isSending = false)
    );
  }

  /*expandPost(post: PostInfo) {
    const MatDialogRef = this.dialog.open(PostInfoDialog, {
      height: '40rem',
      width: '40rem',
      disableClose: false,
      data: { post: post },
    });
  }*/

  private findPostKey(postId: string): number {
    for (let i = 0; i < this.allPosts.length; i++) {
      if (this.allPosts[i].postId === postId) {
        return i;
      }
    }
    return -1;
  }

  private loadPost(id: string) {
    const key = this.findPostKey(id);
    this.postsService.getPost(this.allPosts[key].postId).subscribe(
      (res) => (this.allPosts[key] = res),
      (err) => console.error(err)
    );
  }

  private removePost(id: string) {
    const key = this.findPostKey(id);
    this.allPosts.splice(key, 1);
  }
}

interface PostWithPrducts extends PostInfo {
  productList?: ProductInfo[];
  isLoad?: boolean;
}
