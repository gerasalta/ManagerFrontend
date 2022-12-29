import { Component } from '@angular/core';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {

  public clientData: Client[] = []
  public columnData: Column[] = this.setColumns()
  public actionsButtons: any = [];
  public totalDocs: number = 10;
  public pageSize = PAGINTATOR_DEFAULT.pageSize

  constructor(
    private _clientService: ClientsService
  ){}

  ngOnInit(){
    this.getAllClients()
    this.setActionsButtons()
  }

  getAllClients(keyword?: string, pageIndex?: number){
    this._clientService.getAll(keyword, pageIndex, this.pageSize)
    .subscribe({
      next: (r: any) => {
        this.clientData = r.docs;
        this.totalDocs = r.totalDocs;
      }
    })
  }

  setColumns(){
    return this.columnData = [
      {title: 'Nombre', property: 'name'},
      {title: 'Apellido', property: 'lastName'},
      {title: 'Direccion', property: 'address'},
      {title: 'Telefono', property: 'phone'},
      {title: 'Empresa', property: 'company'}
    ]
  }

  searchEvent(value: any){
    this.getAllClients(value)
  }

  pageIndexEvent(value: any){
    this.getAllClients('', value.pageIndex)
  }

  setActionsButtons(){
    this.actionsButtons =  [
      {name: 'Ver', fn: console.log('DetailsDialog')},
      {name: 'Eliminar', fn: console.log('DeleteDialog')},
    ]
  }

}
