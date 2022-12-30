import { Component } from '@angular/core';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsComponent {

  public data: Client[] = []
  public columnData: Column[] = this.setColumns()
  public actionsButtons: ActionButtons[] = [];
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
        this.data = r.docs;
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

  showClientDetails(){
    console.log('Client Details');
  }

  showDeletedialog(){
    console.log('Delete Dialog');
  }

  public setActionsButtons(): void{
    this.actionsButtons = [
      {name: 'Ver', fn: this.showClientDetails},
      {name: 'Eliminar', fn: this.showDeletedialog},
    ]
  }

}
