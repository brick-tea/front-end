import { Component, OnInit } from '@angular/core';
import {
  TradeService,
  OrderStatus,
  OrderReply,
} from 'src/app/service/trade.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order-mananger',
  templateUrl: './order-mananger.component.html',
  styleUrls: ['./order-mananger.component.scss'],
})
export class OrderManangerComponent {
  /** ABANDONED */
}

interface OrderInfo extends OrderStatus {
  title: string;
}
