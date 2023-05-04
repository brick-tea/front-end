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
  loadPosts() {
    this.postsService.getAllPosts().subscribe((res) => (this.allPosts = res));
  }
  ngOnInit(): void {
    this.loadPosts();
  }
  onEdit(post: PostInfo): void {
    const MatDialogRef = this.dialog.open(CreatePostDialog, {
      width: '40rem',
      height: '35rem',
      disableClose: true,
      data: {
        post: post as Post,
        postId: post.postId,
      },
    });
    MatDialogRef.afterClosed().subscribe((res) => {
      if (res) this.loadPosts();
    });
  }
  onDelete(postId: string): void {
    if (confirm('確定要刪除？')) {
      this.postsService.deletePost(postId).subscribe(
        (res) => this.loadPosts(),
        (err) => console.log(err)
      );
    }
  }

  onComment(i: number, postId: string, comment: string) {
    const pack: Comment = { content: comment };
    this.postsService.createComment(postId, pack).subscribe(
      (res) => {
        console.log(res);
        this.loadPosts();
      }, // wait backend changing response body
      (err) => console.log(err)
    );
  }

  expandPost(post: PostInfo) {
    const MatDialogRef = this.dialog.open(PostInfoDialog, {
      height: '40rem',
      width: '40rem',
      disableClose: false,
      data: { post: post },
    });
  }
}
