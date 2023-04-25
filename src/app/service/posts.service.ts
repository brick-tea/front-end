import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const POSTS_API = 'https://192.168.194.45:8080/post/';

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
  addPost(post: Post): Observable<any> {
    return this.http.post(POSTS_API, post, this.api.getHeader('json'));
  }

  /**
   * @param postId
   * @param comment  {"content": "string"}
   */
  addComment(postId: string, comment: string): Observable<any> {
    return this.http.post(
      POSTS_API + postId,
      comment,
      this.api.getHeader('json')
    );
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(POSTS_API + postId, this.api.getHeader('json'));
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete(
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
  editPost(postId: string, post: any): Observable<any> {
    return this.http.patch(
      POSTS_API + postId,
      post,
      this.api.getHeader('text')
    );
  }
  /**
   * @description Get all users' posts
   */
  getAllPosts(): Observable<any> {
    return this.http.get(POSTS_API + 'all/', this.api.getHeader('json'));
  }

  /**
   * @description Get specific post's details
   */
  getPostById(postId: string): Observable<any> {
    return this.http.get(POSTS_API + postId, this.api.getHeader('json'));
  }

  getMyPost(): Observable<any> {
    return this.http.get(POSTS_API + 'my/', this.api.getHeader('json'));
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
