import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  url: string = Env.URL

  constructor(
    private http: HttpClient
  ) {}

  getAll(){
    return this.http.get(`${this.url}/managers`)
  }

}
