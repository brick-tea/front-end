import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const ORDER_API = 'https://thebrickteam.com/order/';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private api: ApiService, private http: HttpClient) {}
  orderProduct(form: OrderForm): Observable<string> {
    return this.http.post<string>(ORDER_API, form, this.api.getHeader('text'));
  }
}
export interface OrderForm {
  productId: string;
  contact: string;
  note: string;
}
