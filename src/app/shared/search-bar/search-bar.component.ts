import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ActionButtons } from 'src/app/interfaces/actions.table';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {

  public keyword: FormControl = new FormControl('')
  @Input() searchButtons: ActionButtons[] = [];
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
