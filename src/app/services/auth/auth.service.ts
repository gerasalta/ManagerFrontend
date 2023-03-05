import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authData } from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000/api/v1'

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
