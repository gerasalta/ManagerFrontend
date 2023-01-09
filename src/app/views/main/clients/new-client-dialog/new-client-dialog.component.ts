import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/interfaces/client.base';
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
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.setUpdateValues()
  }

  closeDialog() {
    if (this.newClient.dirty) {
      const dialog = this._dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Descartar',
          message: 'Los datos se perderan de forma permanente'
        }
      })
      dialog.afterClosed()
        .subscribe({
          next: r => { r === true ? this._dialog.closeAll() : null }
        })
    } else {
      this._dialog.closeAll()
    }
  }

  sendClient() {
    this._clientService.getAll(this.phoneControl.value)
      .subscribe((r: any) => {
        if (r.totalDocs && r.docs[0]._id !== this.data.id) {
          this._snackBar.open('Telefono asociado a otro cliente')
        } else {
          this.dialogRef.close(this.newClient.value)
        }
      })
  }

  setUpdateValues() {
    if (this.data.id) {
      this._clientService.getOne(this.data.id)
        .subscribe((r: any) => {
          this.nameControl.setValue(r.data.name)
          this.lastNameControl.setValue(r.data.lastName)
          this.phoneControl.setValue(r.data.phone)
          this.companyControl.setValue(r.data.company)
          this.addressControl.setValue(r.data.address)
        })
    }
  }

}
