import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Column } from 'src/app/interfaces/column.base';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data = [];
  @Input() columnData: Column[] = [];
  @Input() totalDocs: number;
  @Input() actionsButtons: ActionButtons[] = [];
  @Output() pageIndexEvent = new EventEmitter<any>
  public dataSource = [];
  public displayedColumns: Column[] = [];
  public pageEvent;
  public pageSize = PAGINTATOR_DEFAULT.pageSize
  public elementId: string;
  public mobile = this.getSizeWidth()

  constructor(
    public _dialog: MatDialog
  ) { }

  ngOnInit() {
   this.addActionsButtons()
   this.getColumn()
  }

  ngOnChanges() {
    this.getClients()
    this.setOrdersDate()
  }

  getColumnsTitles() {
    return this.displayedColumns.map(r => r.title)
  }
  
  getClients() {
    this.dataSource = this.data
  }
  
  getColumn() {
    if(this.mobile){
    this.columnData =  this.columnData.filter(r => r.mobile)
    }
    this.displayedColumns = this.columnData
  }

  getPage(event?: PageEvent) {  
    event.pageIndex += 1
    this.pageIndexEvent.emit(event)
  }

  addActionsButtons(){
    if(this.actionsButtons && this.actionsButtons.length){
      this.columnData.push({title: 'Acciones', property: null, mobile: true})
    }else{
      return
    }
  }

  getElementId(element: any){
    this.elementId = element._id
  }

  setOrdersDate(){
    let index = 0
    this.dataSource.forEach(r => {
      this.dataSource[index].term = new Date(r.term).toLocaleDateString('es-MX', { month: '2-digit', day: '2-digit'});
      index++
    })
  }

  getSizeWidth(){
    return window.innerWidth < 1000 ? true : false
  }

}
