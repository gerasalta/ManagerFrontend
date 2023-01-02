import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

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
  public totalDocs: number = 10;
  public pageSize = PAGINTATOR_DEFAULT.pageSize

  constructor(
    public _dialog: MatDialog,
    public _clientService: ClientsService,
    public _snackBar: MatSnackBar,
    public _loading: LoadingService
  ){}

  ngOnInit(){
    this.getAllClients()
    this.setActionsButtons()
  }

  getAllClients(keyword?: string, pageIndex?: number){
    this._clientService.getAll(keyword, pageIndex, this.pageSize)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs; }
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

  deleteClient(id: string){
    this._loading.open()
    this._clientService.delete(id)
    .subscribe({
      next: (r: any) => {this._snackBar.openFromComponent(SnackBarComponent, {data: {message: r.message}}); this.getAllClients()},
      error: e => console.log(e),
      complete: () => { this._loading.close() }
    })
  }

  showClientDetails = (id: string) => {
    console.log('Client Details');
  }

  showDeletedialog = (id: string) => {
    const dialog =this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Cliente',
        message: 'Los datos del cliente serán eliminados de forma permanente'
      }
    })
    dialog.afterClosed()
    .subscribe({
      next: r => {r === true ? this.deleteClient(id) : null}
    })
  }

  public setActionsButtons(){
    this.actionsButtons = [
      {name: 'Ver', fn: this.showClientDetails},
      {name: 'Eliminar', fn: this.showDeletedialog},
    ]
  }

}
