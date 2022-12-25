import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  public ELEMENT_DATA = [
    {name: 'Hydrogen', lastName: 1.0079, address: 'H'},
    {name: 'Hydrogen', lastName: 1.0079, address: 'H'},
    {name: 'Hydrogen', lastName: 1.0079, address: 'H'}
  ];
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Direccion'];
  dataSource = this.ELEMENT_DATA;

  constructor(){}

  ngOnInit(){}


}
