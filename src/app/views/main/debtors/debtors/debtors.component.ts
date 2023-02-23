import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Client } from 'src/app/interfaces/client.base';
import { Column } from 'src/app/interfaces/column.base';
import { AdvancesService } from 'src/app/services/advances/advances.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss']
})
export class DebtorsComponent {

  public pageSize = PAGINTATOR_DEFAULT.pageSize
  public data: Client[] = []
  public columnData: Column[] = this.setColumns()
  public totalDocs: number = 10;
  public actionsButtons: ActionButtons[] = [];
  public completeStatus: boolean = true;
  public searchButtons: ActionButtons[] = [];

  constructor(
    public _loading: LoadingService,
    public _ordersService: OrdersService,
    public dialog: MatDialog,
    public _snackbarService: MatSnackBar,
    public _loadingService: LoadingService,
    public _advanceServices: AdvancesService
  ){}

  ngOnInit(){
    this.getAllOrders(),
    this.setActionsButtons()
  }

  getAllOrders(keyword?: string, pageIndex?: number){
    this._loading.open()
    this._ordersService.getAll(keyword, pageIndex, this.pageSize, this.completeStatus)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs},
      complete: () => { this._loading.close() }
    })
  }

  pageIndexEvent(value: any){
    this.getAllOrders('', value.pageIndex)
  }

  setColumns(){
    return this.columnData = [
      {title: 'Nombre', property: 'fullName'},
      {title: 'Empresa', property: 'company'},
      {title: 'Deuda', property: 'debt'}
    ]
  }

  showPaymentDialog = (id: string) => {
   const dialog = this.dialog.open(PaymentDialogComponent, {data: id})
   dialog.afterClosed()
    .subscribe(r => {
      if (r){
        this._loadingService.open()
        this._advanceServices.patch(id, r)
        .subscribe({
          next: r => {
            this._snackbarService.open('Pago añadido');
            this.checkBalance(id)
          },
          error: e => this._snackbarService.open('Ha ocurrido un error'),
          complete: () => {this._loadingService.close()}
        })
      }
    })
  }

  showDeletedialog = (id: string) => {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Deuda',
        message: 'La deuda será eliminada de forma permanente'
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
      next: (r: any) => {this._snackbarService.open('El pedido ha sido removido con exito'); this.getAllOrders()},
      error: e => { this._snackbarService.open('Error al eliminar el pedido')},
      complete: () => { this._loading.close() }
    })
  }

  setActionsButtons(){
    this.actionsButtons = [
      {name: 'Pagar', fn: this.showPaymentDialog},
      {name: 'Eliminar', fn: this.showDeletedialog},
    ]
  }

  searchEvent(value: any){
    this.getAllOrders(value)
  }

  checkBalance(id: string){
    this._advanceServices.getOne(id)
    .subscribe({
      next: (r: any) => {
        if(r.data.balance === 0){
          this._ordersService.delete(id)
          .subscribe({
            next: r => {this._snackbarService.open('Deuda removida exitosamente')}
          })
        }
        this.getAllOrders()
      },
      error: e => {this._snackbarService.open('Ha ocurrido un error')}
    })
  }

}
