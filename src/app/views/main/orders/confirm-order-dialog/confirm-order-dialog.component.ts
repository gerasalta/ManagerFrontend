import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ManagersService } from 'src/app/services/managers/managers.service';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.scss']
})
export class ConfirmOrderDialogComponent {

  public form: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.required]),
    managerId: new FormControl('', [Validators.required])
  })
  public todayDate = new Date
  public managers: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    public _managersService: ManagersService,
    public _snackbarService: MatSnackBar
  ){}

  ngOnInit(){
    this.getManagers()
  }

  close(){
    this.dialogRef.close(false)
  }

  confirm(){
    this.dialogRef.close(this.form)
  }

  getManagers(){
    this._managersService.getAll()
    .subscribe({
      next: (r: any[]) => { this.managers = r},
      error: e => {this._snackbarService.open('Ha ocurrido un problema')},
      complete: () => {}
    })
  }

}
