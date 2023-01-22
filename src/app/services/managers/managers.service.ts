import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) {}

  getAll(){
    return this.http.get(`${this.url}/managers`)
  }

}
