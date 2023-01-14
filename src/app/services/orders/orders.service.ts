import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/interfaces/orders.base';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) { }


  post(order: Order){
    return this.http.post(`${this.url}/notes`, order)
  }


}
