import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PAGINATOR_OPTIONS } from 'src/app/constants/paginator-options.clients';
import { Client } from 'src/app/interfaces/client.base';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) {}

  getAll(keyword?: string, page?: number, pageSize?: number){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = page ? `&pageIndex=${page}` : ''
    let pageSizeQuery = pageSize ? `&limit=${pageSize}` : ''
    return this.http.get(`${this.url}/clients?${keywordQuery}${pageQuery}${pageSizeQuery}`)
  }




}
