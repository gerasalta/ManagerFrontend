import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

  public keyword: FormControl = new FormControl('')

  @Output() searchEvent = new EventEmitter<string>();

  constructor(){}

  ngOnInit(){
    this.sendKeyword()
  }

  sendKeyword(){
      this.keyword.valueChanges
      .pipe(debounceTime(200))
      .subscribe((r)=>{
        this.searchEvent.emit(r)
      })
  }

  clearFilters(){
    this.keyword.setValue('')
  }

}
