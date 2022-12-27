import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() clientData: Client[] = [];
  @Input() columnData: Column[] = [];
  @Input() totalDocs: number;
  @Output() pageIndexEvent = new EventEmitter<any>
  public dataSource: Client[] = [];
  public displayedColumns: Column[] = [];
  public pageEvent;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getColumn()
    this.getClients()
  }

  getColumnsTitles() {
    return this.displayedColumns.map(r => r.title)
  }

  getClients() {
    this.dataSource = this.clientData
  }

  getColumn() {
    this.displayedColumns = this.columnData
  }

  getPage(event?: PageEvent) {
    event.pageIndex += 1
    this.pageIndexEvent.emit(event)
  }


}
