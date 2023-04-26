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

  createProduct(product: Product): Observable<any> {
    const body = JSON.stringify(product);
    return this.http.post(PRODUCT_API, body, this.api.getHeader('text'));
  }

  getMyProducts(): Observable<any> {
    const header = this.api.getHeader('json');
    return this.http.get(PRODUCT_API + 'my/', header);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(PRODUCT_API + 'all/', this.api.getHeader('json'));
  }
}

export interface Product {
  status: string;
  title: string;
  content: string;
  price: 0;
  tag_Id: 0;
}
