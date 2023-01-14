import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { OrdersComponent } from './orders/orders/orders.component';
import { MaterialModule } from 'src/app/styles/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NewClientDialogComponent } from './clients/new-client-dialog/new-client-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewOrderComponent } from './orders/new-order/new-order.component';

@NgModule({
  declarations: [HomeComponent, ClientsComponent, OrdersComponent, NewClientDialogComponent, NewOrderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [HomeComponent, ClientsComponent, OrdersComponent]
})

export class MainModule { }
