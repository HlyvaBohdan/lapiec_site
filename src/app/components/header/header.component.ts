import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private basket: Array<IProduct> = [];
  totalPrice = 0;
  constructor(private ordService: OrderService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
  }

  private checkBasket(): void {
    this.ordService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    )
  }
  
  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem("myOrder")) {
      this.basket = JSON.parse(localStorage.getItem("myOrder"));
      this.totalPrice = this.basket.reduce((total, elem) => {
        return total + (elem.price * elem.count);
      }, 0)
    }
  }
}
