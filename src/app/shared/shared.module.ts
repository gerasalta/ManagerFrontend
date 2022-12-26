import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MaterialModule } from '../styles/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchBarComponent,
    TableComponent
  ]
})
export class SharedModule { }
