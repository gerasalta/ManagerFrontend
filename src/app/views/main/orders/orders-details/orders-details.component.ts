import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrderService } from 'src/app/services/order/order.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent {

  public orderId: string = this.getClientId()
  public clientData: any = {}
  public orders: any = []

  constructor(
    public activatedRoute: ActivatedRoute,
    public _orderService: OrdersService,
    public _snackbarService: MatSnackBar,
    public _loadingService: LoadingService,
    public _clientService: ClientsService,
    public _dialog: MatDialog,
    public _singleOrderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrder()
  }

  getOrder() {
    this._loadingService.open()
    this._orderService.getOne(this.orderId)
      .subscribe({
        next: (r: any) => { this.getClientData(r.data.clientId); this.orders = r.data},
        error: e => { this._snackbarService.open('Ha ocurrido un error'), this._loadingService.close() },
        complete: () => {this._loadingService.close()}
      })
  }

  getClientData(id: string) {
    this._clientService.getOne(id)
      .subscribe((r: any) => { this.clientData = r.data })
  }

  getClientId() {
    return this.activatedRoute.snapshot.paramMap.get('id')
  }

  deleteOrder(id: string) {
    let dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar orden',
        message: 'El pedido sera borrado de forma permanente'
      }
    })
    dialog.afterClosed()
      .subscribe(r => {
        if (r && this.orders.orders.length > 1) {
          this._loadingService.open()
          this._singleOrderService.delete(id)
            .subscribe({
              next: r => {this._snackbarService.open('Pedido eliminado exitosamente'); this.getOrder()},
              error: e => this._snackbarService.open('Ha ocurrido un error'),
              complete: () => this._loadingService.close()
            })
        }
      })
  }
  
}
