import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  url: string = Env.URL

  constructor(
    private http: HttpClient
  ) {}

  getOne(orderId){
    return this.http.get(`${this.url}/advances/${orderId}`)
  }

  patch(orderId: string, advance: number){
    return this.http.patch(`${this.url}/advances/${orderId}`, {advance: advance})
  }

}
