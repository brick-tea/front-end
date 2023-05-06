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
import { UserAuthService } from 'src/app/service/user-auth.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostInfoDialog } from './post-info-dialog/post-info-dialog';
import { UserService } from 'src/app/service/user.service';
import { CreatePostDialog } from 'src/app/layout/sidebar/dialog/create-post-dialog/create-post-dialog';
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
    private postsService: PostsService
  ) {
    if (authService.loginStatus() !== true) {
      router.navigate(['/login']);
    }
  }
  user: string = this.userService.catchUserAccount();
  allPosts$: Observable<PostInfo[]> = this.postsService.getAllPosts();
  allPosts!: PostInfo[];

  ngOnInit(): void {
    this.loadAllPosts();
  }

  /** Post Operations */
  loadAllPosts() {
    this.postsService.getAllPosts().subscribe((res) => (this.allPosts = res));
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
  onComment(postKey: number, comment: string) {
    this.isSending = true;
    const pack: Comment = { content: comment };
    const postId = this.allPosts[postKey].postId;
    this.postsService.createComment(postId, pack).subscribe(
      (res) => {
        this.allPosts[postKey].comment.push(res);
        comment = '';
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
