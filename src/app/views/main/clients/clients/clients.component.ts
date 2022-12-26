import { Component } from '@angular/core';
import { Client } from 'src/app/interfaces/client.base';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  public clientData: Client[] = [
    {
    _id: "635419f0a29509a5afe19367",
    name: "paton",
    lastName: "miranda",
    phone: "3875335060",
    address: "none",
    company: "fc grafica",
    createdAt: "2022-10-22T16:27:28.029Z",
    updatedAt: "2022-10-23T04:52:44.779Z",
    __v: 0
  },
    {
    _id: "635419f0a29509a5afe19322",
    name: "gera",
    lastName: "gutierrez",
    phone: "3875335055",
    address: "none",
    company: "fc grafica",
    createdAt: "2022-10-22T16:27:28.029Z",
    updatedAt: "2022-10-23T04:52:44.779Z",
    __v: 0
  }
]

  constructor(){}

  ngOnInit(){}

  newItemEvent(value: any){
    console.log(value);
  }

}
