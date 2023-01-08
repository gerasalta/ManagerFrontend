import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss']
})
export class NewClientDialogComponent {

  public newClient: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    address: new FormControl(),
    company: new FormControl(),
  })

  public nameControl: AbstractControl = this.newClient.get('name')
  public lastNameControl: AbstractControl = this.newClient.get('lastName')
  public phoneControl: AbstractControl = this.newClient.get('phone')
  public addressControl: AbstractControl = this.newClient.get('address')
  public companyControl: AbstractControl = this.newClient.get('company')

  constructor(
    public dialogRef: MatDialogRef<NewClientDialogComponent>,
    public _clientService: ClientsService,
    public _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) { }

  closeDialog() {
    if (this.newClient.dirty){
      const dialog = this._dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Descartar',
          message: 'Los datos se perderan de forma permanente'
        }
      })
      dialog.afterClosed()
      .subscribe({
        next: r => {r === true ?  this._dialog.closeAll() : null}
      })
    }else{
      this._dialog.closeAll()
    }
  }

  sendClient(){
    this._clientService.getAll(this.phoneControl.value)
    .subscribe((r: any) => {
      if(r.totalDocs){
        this._snackBar.open('El numero ya ha sido registrado')
      }else{
        this.dialogRef.close(this.newClient.value)
      }
    })
  }

}
