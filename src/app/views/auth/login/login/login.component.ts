import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public hide = true;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
  }) 

  public usernameControl = this.loginForm.get('username') as AbstractControl
  public passwordControl = this.loginForm.get('password') as AbstractControl

  constructor(){}

  ngOnInit(){

  }

  login(){
    console.log(this.loginForm.value)
  }



}
