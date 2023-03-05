import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(
    public _authService: AuthService,
    public _snackbarService: MatSnackBar,
    public _cookieService: CookieService,
    private router: Router
  ){}

  ngOnInit(){

  }

  login(){
    this._authService.login(this.loginForm.value)
    .subscribe({
      next: (r: any) => {this._cookieService.set('access_token', r.access_token, 1, '/'), this.router.navigate(['home/orders'])},
      error: e => {this._snackbarService.open('Datos Incorrectos')}
    })
  }



}
