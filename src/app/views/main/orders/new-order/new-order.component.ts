import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  public clientId = this.getClientId()
  public clientData: any = {data: ''};

  constructor(
    public activatedRoute: ActivatedRoute,
    public _clientService: ClientsService,
    public _loadingService: LoadingService,
    public _snackbarService: MatSnackBar
    ){}

  ngOnInit(){
    this.getClientData()
  }

  createOrder(){
    
  }

  getClientId(){
    return this.activatedRoute.snapshot.paramMap.get('id')
  }

  getClientData(){
    this._loadingService.open()
    this._clientService.getOne(this.clientId)
    .subscribe({
      next: (r: any) => this.clientData = r,
      error: e => this._snackbarService.open(e),
      complete: () => this._loadingService.close()
    })
  }

  




}
