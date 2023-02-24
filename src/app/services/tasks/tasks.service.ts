import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url: string = 'http://localhost:3000/api/v1'

  constructor(
    private http: HttpClient
  ) { }

  getAll(keyword?: string, pageIndex?: number, pageSize?: number, status?: boolean){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = pageIndex ? `&pageIndex=${pageIndex}` : ''
    let pageSizeQuery = pageSize ? `&limit=${pageSize}` : ''
    let statusQuery = status ? `&complete=${status}` : ''
    return this.http.get(`${this.url}/tasks?${keywordQuery}${pageQuery}${pageSizeQuery}${statusQuery}`)
  }

  delete(id:string){
    return this.http.delete(`${this.url}/tasks/${id}`)
  }

  post(task: any){
    return this.http.post(`${this.url}/tasks`, task)
  }

}
