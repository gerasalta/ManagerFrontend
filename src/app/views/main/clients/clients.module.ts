import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/styles/material/material.module';

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})

export class ClientsModule { }
