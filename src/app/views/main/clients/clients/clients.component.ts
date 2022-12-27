import { Component } from '@angular/core';
import { PAGINATOR_OPTIONS } from 'src/app/constants/paginator-options.clients';
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
  public paginatorOptions: any = {
    pageSize: PAGINATOR_OPTIONS.pageSize
  }

  constructor(
    private _clientService: ClientsService
  ){}

  ngOnInit(){
    this.getAllClients()
  }

  getAllClients(keyword?: string, pageIndex?: number){
    this._clientService.getAll(keyword, pageIndex, this.paginatorOptions.pageSize)
    .subscribe({
      next: (r: any) => {this.clientData = r.docs; this.paginatorOptions.totalDocs = r.totalDocs}
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
    console.log(value)
    this.getAllClients('', value.pageIndex)
  }

}
