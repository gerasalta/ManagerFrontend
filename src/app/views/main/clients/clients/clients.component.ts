import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  constructor(){}

  ngOnInit(){}

  newItemEvent(value: any){
    console.log(value);
  }

}
