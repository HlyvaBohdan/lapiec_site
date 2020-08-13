import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {
  adminOrders: Array<IOrder> = [];
  orderDetails: IOrder;
  nameOrder: string;
  modalRef: BsModalRef;
  reverse: boolean = false;
  order: string = 'data';

  constructor(private orderService:OrderService,
    private modalService: BsModalService,
    ) {

     }

  ngOnInit(): void {
    this.getOrders()
  }

  private getOrders():void{
    this.orderService.getOrder().subscribe(data => {
      this.adminOrders = data;
    })

  }
  openDetailsModal(order: IOrder, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered test'});
    this.orderDetails = order;
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  changeOrderStatus(orderDetails: IOrder, status: boolean): void{
    status==true ? orderDetails.status='Прийнято' : orderDetails.status='Відхилено';
    this.modalService.hide(1);
  }
  completeOrder(order: IOrder): void{
    order.status='Завершено'
  }
  deleteOrder(order: IOrder): void{
    this.orderService.deleteOrder(order.id).subscribe(data => {
      this.getOrders()
    })
  }
}
