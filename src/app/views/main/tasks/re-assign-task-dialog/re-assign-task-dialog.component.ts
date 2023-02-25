import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagersService } from 'src/app/services/managers/managers.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-re-assign-task-dialog',
  templateUrl: './re-assign-task-dialog.component.html',
  styleUrls: ['./re-assign-task-dialog.component.scss']
})
export class ReAssignTaskDialogComponent {

  public defaultManager: string;
  public managers: any[] = []
  public newManagerId: FormControl = new FormControl(null, Validators.required)

  constructor(
    public dialogRef: MatDialogRef<ReAssignTaskDialogComponent>,
    public _managersService: ManagersService,
    public _tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(){
    this.getTask()
    this.getManagers()
  }

  close(){
    this.dialogRef.close()
  }

  confirm(){
    this.dialogRef.close(this.newManagerId.value)
  }
  
  getManagers(){
    this._managersService.getAll()
    .subscribe( (r:any) => {this.managers = r})
  }

  getTask(){
    this._tasksService.getOne(this.data)
    .subscribe((r: any) => {this.newManagerId.setValue(r.data.managerId); this.defaultManager = r.data.managerId})
  }



}
