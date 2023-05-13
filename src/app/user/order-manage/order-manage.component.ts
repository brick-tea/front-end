import { Component, OnInit } from '@angular/core';
import { TradeService, OrderStatus } from 'src/app/service/trade.service';
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
  getProduct() {}
  ngOnInit() {
    this.getSellStatus();
    this.getBuyStatus();
  }
}
