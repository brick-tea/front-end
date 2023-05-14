import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const PRODUCT_API = 'https://thebrickteam.com/product/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private storage: StorageService
  ) {}

  createProduct(product: Product): Observable<ProductInfo> {
    return this.http.post<ProductInfo>(
      PRODUCT_API,
      product,
      this.api.getHeader('json')
    );
  }

  createProductImage(image: FormData): Observable<string> {
    console.log(image);
    return this.http.post<string>(
      PRODUCT_API + 'image',
      image,
      this.api.getHeader('text')
    );
  }

  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(
      PRODUCT_API + productId,
      this.api.getHeader('text')
    );
  }

  /** PATCH API */
  updateProduct(
    product: ProductUpdate,
    productId: string
  ): Observable<ProductInfo> {
    console.log(product);
    return this.http.patch<ProductInfo>(
      PRODUCT_API + productId,
      product,
      this.api.getHeader('json')
    );
  }

  /** GET API */
  getMyProducts(): Observable<ProductInfo[]> {
    const header = this.api.getHeader('json');
    return this.http.get<ProductInfo[]>(PRODUCT_API + 'my/', header);
  }

  /**https://thebrickteam.com/product/all/?page=0 */
  getAllProducts(page?: number): Observable<ProductList> {
    let pg: string = '0';
    if (page !== undefined) {
      pg = page.toString();
    }
    console.log(PRODUCT_API + 'all/?page=' + pg.toString());
    return this.http.get<ProductList>(
      PRODUCT_API + 'all/?page=' + pg.toString(),
      this.api.getHeader('json')
    );
  }

  getProduct(id: string): Observable<ProductInfo> {
    return this.http.get<ProductInfo>(
      PRODUCT_API + id,
      this.api.getHeader('json')
    );
  }

  getProductList(ids: string[]): Observable<ProductInfo[]> {
    let query = '';
    for (let id of ids) {
      query = query + '&ids=' + id;
    }
    console.log(query);
    return this.http.get<ProductInfo[]>(
      PRODUCT_API + 'list/?' + query,
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

export interface ProductUpdate extends Product {
  // sellStatus: boolean;
}

/** use GET method to get */
export interface ProductInfo extends ProductUpdate {
  productId: string;
  account: string;

  image1: Blob;
  image2: Blob;
  image3: Blob;

  postTime: string;
  lastEdit: string;
  sellStatus: string;
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

export interface ProductList {
  totalNumber: number;
  product: ProductInfo[];
}
