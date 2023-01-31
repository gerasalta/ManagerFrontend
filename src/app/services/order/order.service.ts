import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    public http: HttpClient
  ) { }

  delete(id:string){
    return this.http.delete(`${this.url}/orders/${id}`)
  }
}
