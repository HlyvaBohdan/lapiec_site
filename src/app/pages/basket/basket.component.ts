import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order: Array<IProduct> = [];
  totalPrice = 0;
  constructor(private ordService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();

  }
  private getBasket(): void{
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.order = JSON.parse(localStorage.getItem('myOrder'))
    }
  }
  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.getTotal();
    this.updateBasket();
    this.ordService.basket.next();
  }

  private getTotal(): void{
    this.totalPrice = this.order.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    },0)
  }
  
  private updateBasket():void {
  localStorage.setItem('myOrder',JSON.stringify(this.order))
}
}
