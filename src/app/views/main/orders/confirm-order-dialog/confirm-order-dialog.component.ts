import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.scss']
})
export class ConfirmOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
  ){}

  close(){
    this.dialogRef.close()
  }

}
