import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}


  closeDialog(){
    this.dialogRef.close(false)
  }

  onConfirmClick(){
    this.dialogRef.close(true)
  }

  setConfirmButton(){
    if(this.data.confirmButtonName){
      return this.data.confirmButtonName
    }else{
      return 'Confirmar'
    }
  }

  setCancelButton(){
    if(this.data.cancelButtonName){
      return this.data.cancelButtonName
    }else{
      return 'Cancelar'
    }
  }

}
