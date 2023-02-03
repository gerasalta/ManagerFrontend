import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  public subtotal: number = 0
  public total: number = 0
  public totalAdvances: number = 0
  public balance: number = 0

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
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
        next: (r: any) => { this.getClientData(r.data.clientId); this.orders = r.data },
        error: e => { this._snackbarService.open('Ha ocurrido un error'), this._loadingService.close() },
        complete: () => { this._loadingService.close(); this.getSubtotal(), this.getTotal(); this.getAdvances(), this.getBalance() }
      })
  }

  getClientData(id: string) {
    this._clientService.getOne(id)
      .subscribe((r: any) => { this.clientData = r.data })
  }

  getClientId() {
    return this.activatedRoute.snapshot.paramMap.get('id')
  }

  deleteOrder(id: string, index: number) {
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
              next: r => { this._snackbarService.open('Pedido eliminado exitosamente'); this.getOrder() },
              error: e => this._snackbarService.open('Ha ocurrido un error'),
              complete: () => this._loadingService.close()
            })
        }
      })
  }

  getSubtotal() {
    this.subtotal = 0;
    this.orders.orders.forEach(e => {
      this.subtotal += e.price
    });
  }

  getTotal() {
    this.total = 0;
    this.total = this.subtotal - this.orders.discount
  }

  getAdvances() {
    this.totalAdvances = 0;
    this.orders.advances.forEach(e => {
      this.totalAdvances += e.advance
    });
  }

  getBalance() {
    this.balance = 0;
    this.balance = this.subtotal - this.totalAdvances
  }

  completeOrder() {
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Al completar el pedido el mismo sera removido de la lista',
        title: 'Completar Pedido'
      }
    })
    dialog.afterClosed()
      .subscribe(r => {
        if (r) {
          this._loadingService.open()
          this._orderService.complete(this.orders._id)
            .subscribe({
              next: (r) => { this._snackbarService.open('El pedido ha sido completado'); this.getOrder(); this.router.navigate(['home/orders'])},
              error: e => { this._snackbarService.open('Ha ocurrido un error'); this._loadingService.close() },
              complete: () => { this._loadingService.close() }
            })
        }
      })
  }

}
