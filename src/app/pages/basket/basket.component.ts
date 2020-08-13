import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order: Array<IProduct> = [];
  allOrders:Array<IOrder>=[]
  totalPrice = 0;
  currentOrder:Array<IProduct>;
  currentTotalPrice: number;
  orderID = 1;
  orderComplete: boolean;

  constructor(private ordService: OrderService) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();
  }
  private getBasket(): void {
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

  private getTotal(): void {
    this.totalPrice = this.order.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0)
  }

  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.order))
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure?')) {
      const index = this.order.findIndex(prod => prod.id === product.id);
      this.order.splice(index, 1);
      this.updateBasket();
      this.getTotal();
      this.ordService.basket.next();

    }
  }
  addOrder(form: NgForm): void {
    const order = new Order(this.orderID,
      form.controls.userName.value,
      form.controls.userPhone.value,
      form.controls.userCity.value,
      form.controls.userStreet.value,
      form.controls.userHouse.value,
      this.order,
      this.totalPrice,
      new Date(),
      form.controls.userComents.value);
    delete order.id
    this.ordService.addOrder(order).subscribe(() => {
      this.currentOrder = order.ordersDetails;
      this.currentTotalPrice = this.totalPrice;
      this.order = [];
      form.reset
      this.updateBasket()
      this.getTotal();
      this.ordService.basket.next();
      this.orderComplete = true;
    })
   
  }
  
  goHome(): void{
        this.orderComplete = false;
  }
 
}
