import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PAGINTATOR_DEFAULT } from 'src/app/constants/paginator.default';
import { ActionButtons } from 'src/app/interfaces/actions.table';
import { Column } from 'src/app/interfaces/column.base';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NewTaskDialogComponent } from '../new-task-dialog/new-task-dialog.component';
import { ReAssignTaskDialogComponent } from '../re-assign-task-dialog/re-assign-task-dialog.component';

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
    this.setSearchButton()
  }

  getAllTasks(keyword?: string, pageIndex?: number){
    this._loading.open()
    this._tasksService.getAll(keyword, pageIndex, this.pageSize)
    .subscribe({
      next: (r: any) => { this.data = r.docs; this.totalDocs = r.totalDocs},
      complete: () => { this._loading.close() }
    })
  }

  setColumns(){
    return this.columnData = [
      {title: 'Tarea', property: 'description'},
      {title: 'Referencia', property: 'reference', mobile: true},
      {title: 'Gestor', property: 'manager', mobile: true}
    ]
  }

  setActionsButtons(){
    this.actionsButtons = [
      {name: 'Eliminar', fn: this.showDeleteDialog},
      {name: 'Reasignar', fn: this.showReAsssingDialog},
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
    .subscribe(r => {
      if (r) {
        this.deleteTask(id)
      }
    })
  }

  showReAsssingDialog = (id: string) =>{
    const dialog = this._dialog.open(ReAssignTaskDialogComponent, {data: id})
    dialog.afterClosed()
    .subscribe(r => {
      if(r){
        this.reAssignTask(id, r)
      }
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

  setSearchButton(){
    this.searchButtons = [
      {name: 'Nueva Tarea', fn: this.showNewTaskDialog}
    ]
  }

  showNewTaskDialog = (id:string) => {
    const dialog = this._dialog.open(NewTaskDialogComponent, {data: id})
    dialog.afterClosed()
    .subscribe(r => {
      if (r) {
        this._loading.open()
        this._tasksService.post(r)
        .subscribe({
          next: r => {this.getAllTasks(), this._snackbarService.open('Tarea añadida')},
          error: e => {this._snackbarService.open('Ha ocurrido un error'), this._loading.close()},
          complete: () => {this._loading.close()}
        })
      }
    })
  }

  showFiltersDialog = (id:string) => {
    const dialog = this._dialog.open(NewTaskDialogComponent, {data: id})
  }

  reAssignTask(taskId: string, managerId: string){
    this._loading.open()
    this._tasksService.patch(taskId, {managerId: managerId})
    .subscribe({
      next: r => { this._snackbarService.open('Tarea reasignada'); this.getAllTasks() },
      error: e => { this._snackbarService.open('Ha ocurrido un error'), this._loading.close() },
      complete: () => { this._loading.close() }
    })
  }

}
