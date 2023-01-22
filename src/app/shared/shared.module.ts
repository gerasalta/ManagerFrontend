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
import { LoadingComponent } from './loading/loading.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { dialogGlobalConfig } from '../constants/dialog.config';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    SearchBarComponent,
    TableComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchBarComponent,
    TableComponent,
    ConfirmDialogComponent,
    SnackBarComponent,
    LoadingComponent
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackbarDefaultConfig, 
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: dialogGlobalConfig
    },
    { provide: MAT_DATE_LOCALE,
      useValue: 'es-ES'
    }
  ],
})
export class SharedModule { }
