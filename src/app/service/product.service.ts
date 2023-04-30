import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

const PRODUCT_API = 'https://192.168.194.45:8080/product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private api: ApiService) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      PRODUCT_API,
      product,
      this.api.getHeader('text')
    );
  }

  getMyProducts(): Observable<ProductInfo[]> {
    const header = this.api.getHeader('json');
    return this.http.get<ProductInfo[]>(PRODUCT_API + 'my/', header);
  }

  getAllProducts(): Observable<ProductInfo[]> {
    return this.http.get<ProductInfo[]>(
      PRODUCT_API + 'all/',
      this.api.getHeader('json')
    );
  }

  getTags(): Observable<ProductTag[]> {
    return this.http.get<ProductTag[]>(
      PRODUCT_API + 'tags',
      this.api.getHeader('json')
    );
  }
}

export interface Product {
  title: string;
  status: string;
  content: string;
  price: number;
  tagName: string;
}

/** use GET method to get */
export interface ProductInfo extends Product {
  productId: string;
  account: string;
  sellStatus: true;

  image1: string;
  image2: string;
  image3: string;

  postTime: string;
  lastEdit: string;
  visible: true;
}
export interface ProductTag {
  id: number;
  tagName: string;
}
