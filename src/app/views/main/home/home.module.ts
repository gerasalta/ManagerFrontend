import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/styles/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ClientsModule } from '../clients/clients.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ClientsModule
  ]
})

export class HomeModule { }
