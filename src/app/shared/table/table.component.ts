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
  public dataSource: Client[] = [];

  public displayedColumns: Column[] = [
    {title: 'Nombre', property: 'name'},
    {title: 'Apellido', property: 'lastName'},
    {title: 'Direccion', property: 'address'},
    {title: 'Telefono', property: 'phone'},
    {title: 'Empresa', property: 'company'}
  ];
  
  constructor(){}

  ngOnInit(){
    this.getClients()
  }

  getColumnsTitles(){
    return this.displayedColumns.map(r=>r.title)
  }

  getClients(){
    this.dataSource = this.clientData
  }


}
