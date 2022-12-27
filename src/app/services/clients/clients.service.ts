import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) {}

  getAll(keyword?: string, pageIndex?: number){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = pageIndex ? `&pageIndex=${pageIndex}` : ''
    return this.http.get(`${this.url}/clients?${keywordQuery}${pageQuery}`)
  }




}
