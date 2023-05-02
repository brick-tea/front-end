import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const PRODUCT_API = 'https://192.168.194.45:8080/product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private storage: StorageService
  ) {}

  createProduct(product: Product): Observable<string> {
    return this.http.post<string>(
      PRODUCT_API,
      product,
      this.api.getHeader('text')
    );
  }

  createProductImage(image: FormData): Observable<string> {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.storage.get(this.storage.accessToken),
        'Content-Type': 'multipart/form-data',
      }),
      responseType: 'text/plain',
    };

    console.log(httpOptions);
    console.log(image.get('productId'));
    console.log(image.getAll('images'));
    console.log(image);
    return this.http.post<string>(PRODUCT_API + 'image', image, httpOptions);
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

export interface ProductImage {
  productId: string; // ID of the product
  images: File[];
}
