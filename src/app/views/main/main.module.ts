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
import { ConfirmOrderDialogComponent } from './orders/confirm-order-dialog/confirm-order-dialog.component';
import { OrdersDetailsComponent } from './orders/orders-details/orders-details.component';
import { AddAdvanceDialogComponent } from './orders/add-advance-dialog/add-advance-dialog.component';
import { DebtorsComponent } from './debtors/debtors/debtors.component';
import { PaymentDialogComponent } from './debtors/payment-dialog/payment-dialog.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { NewTaskDialogComponent } from './tasks/new-task-dialog/new-task-dialog.component';
import { ReAssignTaskDialogComponent } from './tasks/re-assign-task-dialog/re-assign-task-dialog.component';
import { AuthModule } from '../auth/auth.module';
import { BudgetComponent } from './budget/budget/budget.component';

@NgModule({
  declarations: [
    HomeComponent, 
    ClientsComponent,
    OrdersComponent,
    NewClientDialogComponent,
    NewOrderComponent,
    ConfirmOrderDialogComponent,
    OrdersDetailsComponent,
    AddAdvanceDialogComponent,
    DebtorsComponent,
    PaymentDialogComponent,
    TasksComponent,
    NewTaskDialogComponent,
    ReAssignTaskDialogComponent,
    BudgetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ]
})

export class MainModule { }
