import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';
import { NewClientDialogComponent } from '../new-client-dialog/new-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MatDialog]
})

export class ClientsComponent {

  public data: Client[] = []
  public columnData: Column[] = this.setColumns()
  public actionsButtons: ActionButtons[] = [];
  public searchButtons: ActionButtons[] = [];
  public totalDocs: number = 10;
  public pageSize = PAGINTATOR_DEFAULT.pageSize

  constructor(
    public _dialog: MatDialog,
    public _clientService: ClientsService,
    public _snackBar: MatSnackBar,
    public _loading: LoadingService,
    private router: Router
  ){}

  ngOnInit(){
    this.getAllClients()
    this.setActionsButtons()
    this.setSearchButton()
  }

  getAllClients(keyword?: string, pageIndex?: number){
    this._loading.open()
    this._clientService.getAll(keyword, pageIndex, this.pageSize)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs; },
      complete: () => { this._loading.close() }
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

  createClient(client: Client){
    this._loading.open()
    this._clientService.post(client)
    .subscribe({
      next: (r: any) => { this._snackBar.open('El cliente ha sido creado con exito'); this.getAllClients() },
      error: e => { this._snackBar.open(e.error.message)},
      complete: () => { this._loading.close() }
    })
  }

  updateClient(id: string, client: Client){
    this._loading.open()
    this._clientService.update(id, client)
    .subscribe({
      next: (r: any) => { this._snackBar.open('El cliente ha sido actualizado con exito'); this.getAllClients() },
      error: e => { this._snackBar.open(e.error.message)},
      complete: () => { this._loading.close() }
    })
  }

  deleteClient(id: string){
    this._loading.open()
    this._clientService.delete(id)
    .subscribe({
      next: (r: any) => {this._snackBar.openFromComponent(SnackBarComponent, {data: {message: 'El cliente ha sido removido con exito'}}); this.getAllClients()},
      error: e => {},
      complete: () => { this._loading.close() }
    })
  }

  showEditDialog = (id: string) => {
    const dialog = this._dialog.open(NewClientDialogComponent, {data: {id: id, title: 'Editar Cliente'}})
    dialog.afterClosed()
    .subscribe({
      next: r => r ? this.updateClient(id, r) : null
    })
  }

  showDeletedialog = (id: string) => {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Cliente',
        message: 'Los datos del cliente incluyendo sus pedidos serán eliminados de forma permanente'
      }
    })
    dialog.afterClosed()
    .subscribe({
      next: r => {r === true ? this.deleteClient(id) : null}
    })
  }

  showNewClientDialog = () =>{
    const dialog = this._dialog.open(NewClientDialogComponent, {data: {title: 'Nuevo Cliente'}})
    dialog.afterClosed()
    .subscribe({
      next: r => {r ? this.createClient(r) : null}
    })
  }

  showNewOrderDialog = (id: string) => {
    this.router.navigate([`home/orders/${id}/new`])
  }

  setActionsButtons(){
    this.actionsButtons = [
      {name: 'Editar', fn: this.showEditDialog},
      {name: 'Eliminar', fn: this.showDeletedialog},
      {name: 'Nuevo Pedido', fn: this.showNewOrderDialog},
    ]
  }

  setSearchButton(){
    this.searchButtons = [
      {name: 'Nuevo Cliente', fn: this.showNewClientDialog}
    ]
  }

}
