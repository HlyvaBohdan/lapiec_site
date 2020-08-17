import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../../../../../la-piec/src/app/shared/services/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private authService: AuthService,
    private ordService: OrderService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.loginIn()
  }

  loginIn(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('')
    })
  }
  
  submit(): void {
    const { userEmail, userPassword } = this.loginForm.value
    this.authService.signIn(userEmail, userPassword)
  }

}
