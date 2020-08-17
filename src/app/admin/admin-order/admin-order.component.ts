import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';
import { IProduct } from '../../../../../../../la-piec/src/app/shared/interfaces/product.interface';
import { Data } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})

export class AdminOrderComponent implements OnInit {
  adminOrders: Array<IOrder> = [];
  orderDetails: Array<IProduct>;
  nameOrder: string;
  modalRef: BsModalRef;
  reverse: boolean = false;
  order: string = 'data';
  totalPrice: number;
  orderId: number;
  orderUser: string;
  orderCity: string;
  orderStreet: string;
  orderHouse: string;
  orderPhone: string;
  orderPayment: number
  orderComment: string;
  orderData: Date;
  orderStatus: string;
  config = {
    ignoreBackdropClick: true
  }

  constructor(private orderService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders(): void {
    this.orderService.getOrder().subscribe(data => {
      this.adminOrders = data;
    })
  }

  openDetailsModal(order: IOrder, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered modal-order' });
    this.orderId = order.id;
    this.orderUser = order.userName;
    this.orderPhone = order.userPhone;
    this.orderCity = order.userCity;
    this.orderStreet = order.userStreet;
    this.orderHouse = order.userHouse;
    this.orderDetails = order.ordersDetails;
    this.orderPayment = order.totalPayment;
    this.orderData = order.dateOrder;
    this.orderComment = order.userComment;
    this.orderStatus = order.status;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  changeOrderStatus(status: boolean): void {
    status == true ? this.orderStatus = 'Прийнято' : this.orderStatus = 'Відхилено';
    this.editOrder()
    this.modalService.hide(1);
  }

  completeOrder(order: IOrder): void {
    order.status = 'Завершено';
    this.orderService.updateOrder(order).subscribe(() => {
      this.getOrders()
    })
  }

  deleteOrder(order: IOrder): void {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.getOrders();
    })
  }

  deleteProductOrder(product: IProduct): void {
    if (confirm('Are you sure?')) {
      const index = this.orderDetails.findIndex(ord => ord.id === product.id)
      this.orderDetails.splice(index, 1);
      this.getTotal()
      this.editOrder()
    }
  }

  private editOrder(comment?: string) {
    const order: IOrder = new Order(this.orderId,
      this.orderUser,
      this.orderPhone,
      this.orderCity,
      this.orderStreet,
      this.orderHouse,
      this.orderDetails,
      this.orderPayment,
      this.orderData,
      this.orderComment,
      this.orderStatus);
    this.orderService.updateOrder(order).subscribe(() => {
      this.getOrders();
    })
    if (this.orderPayment == 0) {
      alert('Замовлення пусте і буде автоматично видалено!')
      this.deleteOrder(order)
      this.modalService.hide(1);
    }
    if (comment == 'hideModal') {
      this.modalService.hide(1);
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
    ;
  }

  private getTotal(): void {
    this.orderPayment = this.orderDetails.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0)
  }

}
