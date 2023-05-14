import { Component, OnInit } from '@angular/core';
import {
  TradeService,
  OrderStatus,
  OrderReply,
} from 'src/app/service/trade.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.scss'],
})
export class OrderManageComponent {
  constructor(private trade: TradeService, private user: UserService) {}
  buyProducts: OrderStatus[] = [];
  sellProducts: OrderStatus[] = [];
  getSellStatus() {
    this.trade.getSellStatus().subscribe((res) => {
      console.log(res);
      this.sellProducts = res;
    });
  }
  getBuyStatus() {
    this.trade.getBuyStatus().subscribe((res) => {
      console.log(res);

      this.buyProducts = res;
    });
  }
  replyOrder(orderId: string, answer: boolean) {
    let status: string;
    if (answer) status = '接受';
    else status = '拒絕';

    if (!confirm('確定要' + status + '訂單？')) return;
    const reply: OrderReply = {
      orderId: orderId,
      answer: answer,
    };
    console.log(reply);
    this.trade.replyOrder(reply).subscribe(
      (res) => {
        console.log(res);
        if (answer) alert('已接受訂單！');
        else alert('訂單已拒絕！');
        this.getSellStatus();
      },
      (err) => console.log(err)
    );
  }
  getProduct() {}
  ngOnInit() {
    this.getSellStatus();
    this.getBuyStatus();
  }
}
