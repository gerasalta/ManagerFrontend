import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvancesService } from 'src/app/services/advances/advances.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-add-advance-dialog',
  templateUrl: './add-advance-dialog.component.html',
  styleUrls: ['./add-advance-dialog.component.scss']
})
export class AddAdvanceDialogComponent {

  public advances: any[] = [];
  public balance: number = 0;
  public today: Date = new Date
  public newAdvance: FormControl = new FormControl()

  constructor(
    public dialogRef: MatDialogRef<AddAdvanceDialogComponent>,
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

  getAdvances(){
    this._advanceService.getOne(this.data)
    .subscribe({
      next: (r: any) => {this.advances = r.data.advances; this.balance = r.data.balance; this.newAdvance.setValidators(Validators.max(this.balance))},
      error: e => { this._snackbarService.open('Ha ocurrido un error')}
    })
  }

  getBalance(){
    if(this.newAdvance){
      return this.balance - this.newAdvance.value
    }else{
      return this.balance
    }
  }

  confirm(){
    this._advanceService.patch(this.data, this.newAdvance.value)
    .subscribe({
      next: (r: any) => !r.hasError ? this.dialogRef.close(this.newAdvance.value) : this.dialogRef.close(false),
      error: e => this._snackbarService.open('Ha ocurrido un error')
    })
  }

}
