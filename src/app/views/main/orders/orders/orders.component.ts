import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { Column } from 'src/app/interfaces/column.base';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from 'src/app/shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  public data: any[] = []
  public columnData: Column[] = this.setColumns()
  public actionsButtons: any[] = []
  public totalDocs: number;
  public pageSize = PAGINTATOR_DEFAULT.pageSize

  constructor(
    public _ordersService: OrdersService,
    public _loading: LoadingService,
    public _dialog: MatDialog,
    public _snackbarService: MatSnackBar,
    public router: Router
  ){}

  ngOnInit(){
    this.getAllOrders()
    this.setActionsButtons()
  }

  getAllOrders(keyword?: string, pageIndex?: number){
    this._loading.open()
    this._ordersService.getAll(keyword, pageIndex, this.pageSize)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs},
      complete: () => { this._loading.close() }
    })
  }

  setColumns(){
    return this.columnData = [
      {title: 'Cliente', property: 'fullName'},
      {title: 'Empresa', property: 'company'},
      {title: 'Gestor', property: 'managerName'},
      {title: 'Saldo', property: 'debt'}
    ]
  }

  pageIndexEvent(value: any){
    this.getAllOrders('', value.pageIndex)
  }

  showViewDialog = (id: string) => {
    this.router.navigate([`home/orders/${id}/view`])
  }

  showDeletedialog = (id: string) => {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Pedido',
        message: 'El pedido será eliminado de forma permanente'
      }
    })
    dialog.afterClosed()
    .subscribe({
      next: r => {r === true ? this.deleteOrder(id) : null}
    })
  }

  
  deleteOrder(id: string){
    this._loading.open()
    this._ordersService.delete(id)
    .subscribe({
      next: (r: any) => {this._snackbarService.openFromComponent(SnackBarComponent, {data: {message: 'El pedido ha sido removido con exito'}}); this.getAllOrders()},
      error: e => { this._snackbarService.open('Error al eliminar el pedido')},
      complete: () => { this._loading.close() }
    })
  }

  setActionsButtons(){
    this.actionsButtons = [
      {name: 'Ver', fn: this.showViewDialog},
      {name: 'Eliminar', fn: this.showDeletedialog},
    ]
  }

  searchEvent(value: any){
    this.getAllOrders(value)
  }

}
