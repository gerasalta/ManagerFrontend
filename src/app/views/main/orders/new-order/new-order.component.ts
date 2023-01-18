import { Component } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ConfirmOrderDialogComponent } from '../confirm-order-dialog/confirm-order-dialog.component';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  public clientId = this.getClientId()
  public clientData: any = {data: ''};
  public advance: FormControl = new FormControl()
  
  public orderForm: FormGroup = new FormGroup ({
    clientID: new FormControl(this.clientId, [Validators.required]),
    discount: new FormControl(null, [Validators.max(30)]),
    advances: new FormArray([]),
    orders: new FormArray([]),
  })

  public ordersControls = this.orderForm.get('orders') as FormArray

  
  constructor(
    public activatedRoute: ActivatedRoute,
    public _clientService: ClientsService,
    public _loadingService: LoadingService,
    public _snackbarService: MatSnackBar,
    public router: Router,
    public _dialog: MatDialog
    ){}

  ngOnInit(){
    this.getClientData()
    this.addOrder()
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
    this.pushAdvance()
    this.getSubtotal()
    this._dialog.open(ConfirmOrderDialogComponent)
  }

  pushAdvance(){
    const form = this.orderForm.get('advances') as FormArray
    form.removeAt(0)
    form.push(new FormGroup({advance: new FormControl(this.advance.value, [Validators.required, Validators.min(0)])}))
  }

  addPrefix(symbol?: string){
    return symbol
  }

  createNewOrderForm(){
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  addOrder(){
    const form = this.orderForm.get('orders') as FormArray
    form.push(this.createNewOrderForm())
  }

  deleteOrder(index: number){
    const form = this.orderForm.get('orders') as FormArray
    form.removeAt(index)
  }

  getSubtotal(){
    let subtotal = 0;
    this.ordersControls.controls.forEach(r => subtotal += Number(r.get('price').value))
    subtotal === 0 ? subtotal = null : null
    return subtotal
  }

  getTotal(){
    let total = this.getSubtotal() * ( (100-this.orderForm.get('discount').value) / 100 )
    total === 0 ? total = null : null
    return total
  }

  getBalance(){
    this.pushAdvance()
    let balance = this.getTotal() - this.orderForm.get('advances').value[0].advance
    balance === 0 ? balance = null : null
    return balance
  }

}
