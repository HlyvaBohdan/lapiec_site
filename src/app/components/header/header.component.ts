import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private basket: Array<IProduct> = [];
  totalPrice = 0;
  loginForm: FormGroup;
  modalRef: BsModalRef;
  userEmail: string;
  userPassword: string;


  constructor(private ordService: OrderService,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage(); 
    this.check();
    
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
  
  submit(): void {
    this.authService.signUp(this.userEmail,this.userPassword)
  }
  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
 
  }
  closeModal(): void {
    this.modalService.hide(1);
  }
  check() {
 return this.authService.checkStatus()
}
}



