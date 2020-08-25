import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  order: Array<IProduct> = [];
  allOrders: Array<IOrder> = []
  totalPrice = 0;
  currentOrder: Array<IProduct>;
  currentTotalPrice: number;
  orderID = 1;
  orderComplete: boolean;
  myUser: any;

  constructor(private ordService: OrderService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getBasket();
    this.getTotal();
    this.getUserData();
  }

  private getBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.order = JSON.parse(localStorage.getItem('myOrder'))
    }
  }

  private getUserData(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.firestore.collection('users').ref.where('idAuth', '==', user.idAuth).onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data() as IUser;
            const id = document.id;
            this.myUser = ({ id, ...data })
          })
        }
      )
    }
  }

  updateUser(user: any, order: IOrder) {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      user.orders.push(Object.assign({}, order));
      const userUpd = new User(
        user.idAuth,
        user.firstName,
        user.lastName,
        user.orders,
        user.role,
        user.email
      )
      localStorage.setItem('user', JSON.stringify(userUpd))
      this.firestore.collection('users').doc(user.id).update(Object.assign({}, userUpd));
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
      new Date().toString(),
      form.controls.userComents.value);
    delete order.id
    // this.ordService.addOrder(order).subscribe(() => {
    this.ordService.addFirecloudOrder(Object.assign({}, order))
      .then(() => {
        this.currentOrder = order.ordersDetails;
        this.currentTotalPrice = this.totalPrice;
        this.updateUser(this.myUser, order);
        this.updateBasket()
        this.getTotal();
        this.ordService.basket.next();
        this.orderComplete = true;
      });
    this.order = [];
    form.reset
    // })
  }

  goHome(): void {
    this.orderComplete = false;
  }

}
