import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = Env.URL

  constructor(
    public http: HttpClient
  ) { }

  delete(id:string){
    return this.http.delete(`${this.url}/orders/${id}`)
  }
}
