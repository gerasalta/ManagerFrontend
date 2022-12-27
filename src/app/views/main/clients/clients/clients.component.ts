import { Component } from '@angular/core';
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

  public columnData: Column[] = [
    {title: 'Nombre', property: 'name'},
    {title: 'Apellido', property: 'lastName'},
    {title: 'Direccion', property: 'address'},
    {title: 'Telefono', property: 'phone'},
    {title: 'Empresa', property: 'company'}
  ]

  constructor(
    private _clientService: ClientsService
  ){}

  ngOnInit(){
    this.getAllClients()
  }

  getAllClients(){
    this._clientService.getAll()
    .subscribe({
      next: (r: any) => {this.clientData = r.docs}
    })
  }

  newItemEvent(value: any){
    console.log(value);
  }

}
