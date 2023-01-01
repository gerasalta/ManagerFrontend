import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from '../styles/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { matSnackbarDefaultConfig } from '../constants/snack-bar.config';

@NgModule({
  declarations: [
    SearchBarComponent,
    TableComponent,
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchBarComponent,
    TableComponent,
    ConfirmDialogComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig,
    },
  ],
})
export class SharedModule { }
