import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const ORDER_API = 'https://thebrickteam.com/order/';
const NOTIFY_API = 'https://thebrickteam.com/mailbox/';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  constructor(private api: ApiService, private http: HttpClient) {}
  orderProduct(form: OrderForm): Observable<string> {
    return this.http.post<string>(ORDER_API, form, this.api.getHeader('text'));
  }
  getSellStatus(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(
      NOTIFY_API + 'sell',
      this.api.getHeader('json')
    );
  }
  getBuyStatus(): Observable<OrderStatus[]> {
    return this.http.get<OrderStatus[]>(
      NOTIFY_API + 'buy',
      this.api.getHeader('json')
    );
  }
  replyOrder(reply: OrderReply): Observable<string> {
    return this.http.post<string>(
      ORDER_API + 'confirm/',
      reply,
      this.api.getHeader('text')
    );
  }
}
export interface OrderForm {
  productId: string;
  contact: string;
  note: string;
}

export interface OrderStatus {
  orderId: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  productTitle: string;
  contact: string;
  note: string;
  isAgree: string;
  createdAt: string;
}

export interface OrderReply {
  orderId: string;
  answer: boolean;
}
