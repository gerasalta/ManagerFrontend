import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { MaterialModule } from 'src/app/styles/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ]
})
export class AdminModule { }
