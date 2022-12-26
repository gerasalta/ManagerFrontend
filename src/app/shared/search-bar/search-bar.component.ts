import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

  public keyword: FormControl = new FormControl('')

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(){}

  ngOnInit(){
    this.sendKeyword()
  }

  sendKeyword(){
      this.keyword.valueChanges
      .subscribe(()=>{
        this.newItemEvent.emit(this.keyword.value)
      })
  }

  clearFilters(){
    this.keyword.setValue('')
  }

}
