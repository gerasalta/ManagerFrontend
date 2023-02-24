import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Column } from 'src/app/interfaces/column.base';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  public pageSize = PAGINTATOR_DEFAULT.pageSize
  public data: any[] = []
  public columnData: Column[] = this.setColumns()
  public totalDocs: number = 10;
  public actionsButtons: ActionButtons[] = [];
  public completeStatus: boolean = true;
  public searchButtons: ActionButtons[] = [];

  constructor(
    public _loading: LoadingService,
    public _tasksService: TasksService,
    public _dialog: MatDialog,
    public _snackbarService: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllTasks(),
    this.setActionsButtons()
  }

  getAllTasks(keyword?: string, pageIndex?: number){
    this._loading.open()
    this._tasksService.getAll(keyword, pageIndex, this.pageSize, this.completeStatus)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs},
      complete: () => { this._loading.close() }
    })
  }

  setColumns(){
    return this.columnData = [
      {title: 'Tarea', property: 'description'},
      {title: 'Gestor', property: 'manager'}
    ]
  }

  setActionsButtons(){
    this.actionsButtons = [
      {name: 'Eliminar', fn: this.showDeleteDialog},
    ]
  }

  searchEvent(value: any){
    this.getAllTasks(value)
  }

  pageIndexEvent(value: any){
    this.getAllTasks('', value.pageIndex)
  }

  showDeleteDialog = (id: string) => {
    const dialog = this._dialog.open(ConfirmDialogComponent, {data: {
      title: 'Eliminar Tarea',
      message: 'Se eliminará la tarea de forma permanente'
    }})
    dialog.afterClosed()
    .subscribe({
      next: r => {this.deleteTask(id)},
      error: e => {this._snackbarService.open('Ha ocurrido un problema')},
      complete: () => {}
    })
  }

  deleteTask(id: string){
    this._loading.open()
    this._tasksService.delete(id)
    .subscribe({
      next: r => {this._snackbarService.open('Tarea eliminada exitosamente'), this.getAllTasks()},
      error: e => {this._snackbarService.open('Ha ocurrido un problema')},
      complete: () => {this._loading.close()}
    })
  }

}
