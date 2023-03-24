import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authData } from 'src/app/interfaces/auth.interface';
import { Env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = Env.URL

  constructor(
    private http: HttpClient
  ) {}


  login(authData: authData){
    return this.http.post(`${this.url}/auth/login`, authData)
  }

  signup(authData: authData){
    return this.http.post(`${this.url}/auth/signup`, authData)
  }

}
