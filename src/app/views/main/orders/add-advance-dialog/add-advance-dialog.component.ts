import { Component, Inject } from '@angular/core';
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

  public advances = [];
  public balance = 0;

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
      next: (r: any) => {this.advances = r.data.advances; this.balance = r.data.balance},
      error: e => { this._snackbarService.open('Ha ocurrido un error')}
    })
  }

}
