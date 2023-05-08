import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { PostInfo } from './posts.service';
import { ProductInfo, ProductList } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  productSearchResult: Subject<ProductList> = new Subject<ProductList>();
  postSearchResult: Subject<ProductList> = new Subject<ProductList>();

  constructor() {}

  setProductResults(results: ProductList): void {
    this.productSearchResult.next(results);
  }

  getProductResults(): Observable<ProductList> {
    return this.productSearchResult.asObservable();
  }

  setPostResults(results: ProductList): void {
    this.postSearchResult.next(results);
  }

  getPostResults(): Observable<ProductList> {
    return this.postSearchResult.asObservable();
  }
}
