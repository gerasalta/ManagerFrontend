import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.scss']
})
export class ConfirmOrderDialogComponent {

  public form: FormGroup = new FormGroup({
    term: new FormControl('', [Validators.required]),
    manager: new FormControl('', [Validators.required])
  })

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
  ){}

  close(){
    this.dialogRef.close(false)
  }

  confirm(){
    this.dialogRef.close(this.form)
  }

}
