import { Component, Input } from '@angular/core';
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
  public dataSource: Client[] = [];
  public displayedColumns: Column[] = [];
  
  constructor(){}

  ngOnInit(){
  }
  
  ngOnChanges(){
    this.getColumn()
    this.getClients()
  }

  getColumnsTitles(){
    return this.displayedColumns.map(r=>r.title)
  }

  getClients(){
    this.dataSource = this.clientData
  }

  getColumn(){
    this.displayedColumns = this.columnData
  }

}
