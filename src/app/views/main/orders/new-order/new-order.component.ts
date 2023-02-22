import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ConfirmOrderDialogComponent } from '../confirm-order-dialog/confirm-order-dialog.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  public clientId = this.getClientId()
  public clientData: any = {data: ''}
  public balance: FormControl = new FormControl(null)
  public advance: FormControl = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.balance.value)])
  
  public orderForm: FormGroup = new FormGroup ({
    clientId: new FormControl(this.clientId, [Validators.required]),
    discount: new FormControl(null, [Validators.required, Validators.max(30)]),
    advances: new FormArray([]),
    orders: new FormArray([]),
    term: new FormControl(null),
    managerId: new FormControl(null)
  })

  public ordersControls = this.orderForm.get('orders') as FormArray

  constructor(
    public activatedRoute: ActivatedRoute,
    public _clientService: ClientsService,
    public _orderService: OrdersService,
    public _loadingService: LoadingService,
    public _snackbarService: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
    ){}

  ngOnInit(){
    this.getClientData()
    this.addOrder()
    this.pushAdvance()
    this.getBalance()
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

  confirm(){
    let dialog = this.dialog.open(ConfirmOrderDialogComponent)
    dialog.afterClosed()
    .subscribe(r => {
      if (r){
        this._loadingService.open()
        this.orderForm.get('term').setValue(r.get('term').value)
        this.orderForm.get('managerId').setValue(r.get('managerId').value)
        this._orderService.post(this.orderForm.value)
        .subscribe({
          next: r => { this._snackbarService.open('Orden Creada Exitosamente')},
          error: e => { this._snackbarService.open('Error al crear orden'), this._loadingService.close() },
          complete: () => { this.orderForm.reset(); this.advance.reset(); this.router.navigate(['/home/orders']); this._loadingService.close() }
        })
      }
    })
  }

  pushAdvance(){
    const form = this.orderForm.get('advances') as FormArray
    this.advance.valueChanges
    .subscribe(r => {
      form.removeAt(0)
      form.push(new FormGroup({advance: new FormControl(Number(this.advance.value))}))
    })
  }

  addPrefix(symbol?: string){
    return symbol
  }

  createNewOrderForm(){
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(100)]),
      description: new FormControl('', [Validators.required]),
    })
  }

  addOrder(){
    const form = this.orderForm.get('orders') as FormArray
    form.push(this.createNewOrderForm())
    this.advance.reset()
    this.orderForm.get('discount').reset()
  }

  deleteOrder(index: number){
    const form = this.orderForm.get('orders') as FormArray
    form.removeAt(index)
    this.advance.reset()
    this.orderForm.get('discount').reset()
  }

  getSubtotal(){
    let subtotal = 0;
    this.ordersControls.controls.forEach(r => subtotal += Number(r.get('price').value))
    subtotal === 0 ? subtotal = null : null
    return subtotal
  }

  getTotal(){
    let total = 0;
    total = this.getSubtotal() * ( (100-this.orderForm.get('discount').value) / 100 )
    total === 0 ? total = null : null
    return total
  }

  getBalance(){
    this.orderForm.valueChanges
    .subscribe(r => {
      this.balance.setValue(this.getTotal() - this.advance.value)
      this.balance.value === 0 && !this.advance.value ? this.balance.setValue(null) : null
    })
  }

  clearForm(){
    let dialog = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Limpiar formulario', message: 'Todos los datos se perderán de manera irreversible'}})
    dialog.afterClosed()
    .subscribe(r => {
      if(r){  
        const orders = this.orderForm.get('orders') as FormArray
        orders.clear()
        this.orderForm.get('discount').reset()
        this.advance.reset()
        this.balance.reset()
        this.addOrder()
      }
    })
  }

}
