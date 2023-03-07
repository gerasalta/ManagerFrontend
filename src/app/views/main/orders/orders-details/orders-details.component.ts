import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvancesService } from 'src/app/services/advances/advances.service';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrderService } from 'src/app/services/order/order.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AddAdvanceDialogComponent } from '../add-advance-dialog/add-advance-dialog.component';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent {

  public orderId: string = this.getClientId()
  public clientData: any = {}
  public orders: any = []
  public balancesForm: FormGroup = new FormGroup({
    subtotal: new FormControl(0),
    total: new FormControl(0),
    totalAdvances: new FormControl(0),
    balance: new FormControl(0),
  })

  public subtotalControl = this.balancesForm.get('subtotal') as AbstractControl
  public totalControl = this.balancesForm.get('total') as AbstractControl
  public totalAdvancesControl = this.balancesForm.get('totalAdvances') as AbstractControl
  public balanceControl = this.balancesForm.get('balance') as AbstractControl

  public completeDialogMsg = 'Al completar el pedido el mismo sera removido de la lista'
  
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _orderService: OrdersService,
    public _snackbarService: MatSnackBar,
    public _loadingService: LoadingService,
    public _clientService: ClientsService,
    public _dialog: MatDialog,
    public _singleOrderService: OrderService,
    public _advanceServices: AdvancesService
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
        complete: () => { this._loadingService.close(); this.calculateAmounts() }
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
              next: r => { this._snackbarService.open('Pedido eliminado exitosamente'); this.getOrder() },
              error: e => this._snackbarService.open('Ha ocurrido un error'),
              complete: () => this._loadingService.close()
            })
        }
      })
  }

  getSubtotal() {
    this.subtotalControl.setValue(0)
    let subTotal = 0
    this.orders.orders.forEach(e => {
      subTotal += e.price
    });
    this.subtotalControl.setValue(subTotal)
  }

  getTotal() {
    this.totalControl.setValue(0);
    this.totalControl.setValue(this.subtotalControl.value * ( (100-this.orders.discount) / 100 ))
  }

  getAdvances() {
    this.totalAdvancesControl.setValue(0);
    let total = 0
    this.orders.advances.forEach(r => {
      total += r.advance
    });
    this.totalAdvancesControl.setValue(total)
  }

  getBalance() {
    this.balanceControl.setValue(0)
    this.balanceControl.setValue(this.totalControl.value - this.totalAdvancesControl.value)
  }

  calculateAmounts(){
    this.getSubtotal()
    this.getTotal()
    this.getAdvances()
    this.getBalance()
  }

  openCompleteDialog() {
    this.completeDialogMsg = 'Al completar el pedido el mismo sera removido de la lista'
    if(this.balanceControl.value > 0){
      this.completeDialogMsg = `El pedido será enviado a la lista de deudores (saldo: $${this.balanceControl.value})` 
    }
    const dialog = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.completeDialogMsg,
        title: 'Completar Pedido'
      }
    })
    dialog.afterClosed()
      .subscribe(r => {
        if (r) {
          this._loadingService.open()
          this._orderService.complete(this.orders._id)
            .subscribe({
              next: (r) => {
                this._snackbarService.open('El pedido ha sido completado');
                this.getOrder();
                this.router.navigate(['home/orders']);
                if(this.balanceControl.value === 0){
                  this._orderService.delete(this.orderId)
                  .subscribe()
                }
              },
              error: e => { this._snackbarService.open('Ha ocurrido un error'); this._loadingService.close() },
              complete: () => { this._loadingService.close() }
            })
        }
      })
  }

  openAdvanceDialog(){
    const dialog = this._dialog.open(AddAdvanceDialogComponent, {data: this.orderId})
    dialog.afterClosed()
    .subscribe(r => {
      if (r){
        this._loadingService.open()
        this._advanceServices.patch(this.orderId, r)
        .subscribe({
          next: r => {this._snackbarService.open('Pago añadido'); this.getOrder()},
          error: e => this._snackbarService.open('Ha ocurrido un error'),
          complete: () => {this._loadingService.close()}
        })
      }
    })
  }

}
