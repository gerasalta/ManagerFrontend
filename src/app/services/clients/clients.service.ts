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

  getAll(){
    return this.http.get(`${this.url}/clients`)
  }




}
