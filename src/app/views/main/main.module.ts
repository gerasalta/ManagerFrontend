import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientsModule,
    OrdersModule,
    HomeModule
  ]
})

export class MainModule { }
