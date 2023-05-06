import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const POSTS_API = 'https://thebrickteam.com/post/';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    // private storage: StorageService,
    private api: ApiService,
    private storage: StorageService
  ) {}

  /**
   * @param post post format
   */
  createPost(post: Post): Observable<PostInfo> {
    return this.http.post<PostInfo>(
      POSTS_API,
      post,
      this.api.getHeader('json')
    );
  }

  /**
   * @param postId
   * @param comment  {"content": "string"}
   */
  createComment(postId: string, comment: Comment): Observable<CommentInfo> {
    return this.http.post<CommentInfo>(
      POSTS_API + postId + '/comment',
      comment,
      this.api.getHeader('json')
    );
  }

  deletePost(postId: string): Observable<string> {
    return this.http.delete<string>(
      POSTS_API + postId,
      this.api.getHeader('text')
    );
  }

  deleteComment(postId: string, commentId: Comment): Observable<string> {
    return this.http.delete<string>(
      POSTS_API + postId + '/' + commentId,
      this.api.getHeader('text')
    );
  }

  /**
   * @description edit a post
   * @param postId which post to edit
   * @param post edit content
   * @returns
   */
  editPost(postId: string, post: Post): Observable<PostInfo> {
    return this.http.patch<PostInfo>(
      POSTS_API + postId,
      post,
      this.api.getHeader('json')
    );
  }
  /**
   * @description Get all users' posts
   */
  getAllPosts(): Observable<PostInfo[]> {
    return this.http.get<PostInfo[]>(
      POSTS_API + 'all/',
      this.api.getHeader('json')
    );
  }

  /**
   * @description Get specific post's details
   */
  getPost(postId: string): Observable<PostInfo> {
    return this.http.get<PostInfo>(
      POSTS_API + postId,
      this.api.getHeader('json')
    );
  }

  getMyPosts(): Observable<PostInfo[]> {
    return this.http.get<PostInfo[]>(
      POSTS_API + 'my/',
      this.api.getHeader('json')
    );
  }

  getPostComment(postId: string): Observable<any> {
    return this.http.get(
      POSTS_API + postId + '/comment',
      this.api.getHeader('json')
    );
  }
}
export interface Post {
  title: string;
  content: string;
  status: string;
  productsId: string[];
}

export interface PostInfo extends Post {
  postId: string;
  account: string;
  commentNumbers: number;
  hideNumbers: number;
  comment: CommentInfo[];
  createdAt: string;
  lastEdit: string;
  edit: {
    title: string;
    content: string;
    status: string;
    productsId: string[];
  };
}

export interface Comment {
  content: string;
}
export interface CommentInfo extends Comment {
  commentId: string;
  postId: string;
  account: string;
  createAt: string;
  lastEdit: string;
  display: boolean;
  parentId: string;
}
