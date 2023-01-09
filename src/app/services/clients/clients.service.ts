import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/interfaces/client.base';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) {}

  getAll(keyword?: string, pageIndex?: number, pageSize?: number){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = pageIndex ? `&pageIndex=${pageIndex}` : ''
    let pageSizeQuery = pageSize ? `&limit=${pageSize}` : ''
    return this.http.get(`${this.url}/clients?${keywordQuery}${pageQuery}${pageSizeQuery}`)
  }

  delete(id:string){
    return this.http.delete(`${this.url}/clients/${id}`)
  }

  post(client: Client){
    return this.http.post(`${this.url}/clients`, client)
  }

  getOne(id: string){
    return this.http.get(`${this.url}/clients/${id}`)
  }

  update(id: string, client: Client){
    return this.http.patch(`${this.url}/clients/${id}`, client)
  }

}
