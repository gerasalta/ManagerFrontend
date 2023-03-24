import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  url: string = Env.URL

  constructor(
    private http: HttpClient
  ) { }

  post(task: any){
    return this.http.post(`${this.url}/tasks`, task)
  }

  getAll(keyword?: string, pageIndex?: number, pageSize?: number){
    let keywordQuery = keyword ? `keyword=${keyword}` : ''
    let pageQuery = pageIndex ? `&pageIndex=${pageIndex}` : ''
    let pageSizeQuery = pageSize ? `&limit=${pageSize}` : ''
    return this.http.get(`${this.url}/tasks?${keywordQuery}${pageQuery}${pageSizeQuery}`)
  }

  getOne(id: string){
    return this.http.get(`${this.url}/tasks/${id}`)
  }

  delete(id:string){
    return this.http.delete(`${this.url}/tasks/${id}`)
  }

  patch(taskId: string, managerId: any){
    return this.http.patch(`${this.url}/tasks/${taskId}`, managerId)
  }
}
