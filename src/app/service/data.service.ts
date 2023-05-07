import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { PostInfo } from './posts.service';
import { ProductInfo } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  productSearchResult: Subject<ProductInfo[]> = new Subject<ProductInfo[]>();
  postSearchResult: Subject<PostInfo[]> = new Subject<PostInfo[]>();

  constructor() {}

  setProductResults(results: ProductInfo[]): void {
    this.productSearchResult.next(results);
  }

  getProductResults(): Observable<ProductInfo[]> {
    return this.productSearchResult.asObservable();
  }

  setPostResults(results: PostInfo[]): void {
    this.postSearchResult.next(results);
  }

  getPostResults(): Observable<PostInfo[]> {
    return this.postSearchResult.asObservable();
  }
}
