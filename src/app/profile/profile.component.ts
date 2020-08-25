import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { IOrder } from '../shared/interfaces/order.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userEmail: string;
  userName: string;
  userLastName: string;
  orderDetails: Array<IProduct>;
  orderPayment: number;
  userOrder: any;
  modalRef: BsModalRef;
  checkOrderStatus: Array<IProduct> = [];
  
  constructor(private authService: AuthService,
    private modalService: BsModalService,
    private afStorage: AngularFirestore) { }

  ngOnInit(): void {
    this.getUserData();
    this.updateOrderStatus()
  }

  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userEmail = user.email;
    this.userName = user.firstName;
    this.userLastName = user.lastName;
    this.userOrder = user.orders;
  }

  private updateOrderStatus(): void {
    for (let i = 0; i < this.userOrder.length; i++) {
      this.afStorage.collection('orders').ref.where('dateOrder', '==', this.userOrder[i].dateOrder).onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data() as IProduct;
            const id = document.id;
            this.checkOrderStatus.push({ id, ...data })
          });
        })
    }
    this.userOrder = this.checkOrderStatus;
  }

  openDetailsModal(order: IOrder, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered modal-order' });
    this.orderDetails = order.ordersDetails;
    this.orderPayment = order.totalPayment;
  }

  signOut(): void {
    this.authService.signOut();
  }

}
