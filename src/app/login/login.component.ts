import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.loginIn()
  }
loginIn():void{
  this.loginForm = new FormGroup({
    userEmail: new FormControl('',[Validators.required,Validators.email]),
    userPassword: new FormControl('')
  })
}
  submit(): void{
  console.log(this.loginForm)
}
}
