import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvancesService } from 'src/app/services/advances/advances.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {

  public advances: any[] = [];
  public balance: number = 0;
  public newAdvance: FormControl = new FormControl()

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    public _advanceService: AdvancesService,
    public _snackbarService: MatSnackBar,
    public _loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(){
    this.getAdvances()
  }

  close(){
    this.dialogRef.close()
  }

  confirm(){
    this.dialogRef.close(this.newAdvance.value)
  }

  getAdvances(){
    this._advanceService.getOne(this.data)
    .subscribe({
      next: (r: any) => {
        this.advances = r.data.advances;
        this.balance = r.data.balance;
        this.newAdvance.setValidators(Validators.max(this.balance))
      },
      error: e => { this._snackbarService.open('Ha ocurrido un error')},
      complete: () => {this._loadingService.close()}
    })
  }

  getBalance(){
    if(this.newAdvance){
      return this.balance - this.newAdvance.value
    }else{
      return this.balance
    }
  }

}
