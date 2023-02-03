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

  getAll(keyword?: string, pageIndex?: number, pageSize?: number){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = pageIndex ? `&pageIndex=${pageIndex}` : ''
    let pageSizeQuery = pageSize ? `&limit=${pageSize}` : ''
    return this.http.get(`${this.url}/notes?${keywordQuery}${pageQuery}${pageSizeQuery}`)
  }

  post(order: Order){
    return this.http.post(`${this.url}/notes`, order)
  }

  delete(id:string){
    return this.http.delete(`${this.url}/notes/${id}`)
  }

  getOne(id: string){
    return this.http.get(`${this.url}/notes/${id}`)
  }

  complete(id: string){
    return this.http.patch(`${this.url}/notes/${id}/complete`, {})
  }


}
