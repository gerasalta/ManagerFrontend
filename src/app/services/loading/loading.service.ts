import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOADING_CLOSE } from 'src/app/constants/loading.close';
import { LOADING_OPEN } from 'src/app/constants/loading.open';
import { LoadingConfiguration } from 'src/app/interfaces/loading';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSetting = new BehaviorSubject<LoadingConfiguration>(LOADING_CLOSE);

  constructor() { }

  open(){
    this.loadingSetting.next(LOADING_OPEN)
  }
  
  close(){
    this.loadingSetting.next(LOADING_CLOSE)
  }
  
  getLoadingSetting(){
    return this.loadingSetting.asObservable()
  }

}
