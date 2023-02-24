import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { ManagersService } from 'src/app/services/managers/managers.service';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent {

  public managers: any[] = []

  public newTask: FormGroup = new FormGroup({
    managerId: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    reference: new FormControl(),
  })

  constructor(
    public _dialogRef: MatDialogRef<NewTaskDialogComponent>,
    public _managersService: ManagersService,
    public _snackbarService: MatSnackBar,
    public _loading: LoadingService
  ){}

  ngOnInit(){
    this.getManagers()
  }

  confirm(){
    this._dialogRef.close(this.newTask.value)
  }

  close(){
    this._dialogRef.close()
  }

  getManagers(){
    this._managersService.getAll()
    .subscribe({
      next: (r:any) => {this.managers = r},
      error: e => {this._snackbarService.open('Ha ocurrido un error')}
    })
  }

}
