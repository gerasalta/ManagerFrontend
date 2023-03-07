import { Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/authGuard/auth-guard.guard";
import { AdminComponent } from "../views/admin/admin/admin.component";
import { LoginComponent } from "../views/auth/login/login/login.component";
import { ClientsComponent } from "../views/main/clients/clients/clients.component";
import { DebtorsComponent } from "../views/main/debtors/debtors/debtors.component";
import { HomeComponent } from "../views/main/home/home/home.component";
import { NewOrderComponent } from "../views/main/orders/new-order/new-order.component";
import { OrdersDetailsComponent } from "../views/main/orders/orders-details/orders-details.component";
import { OrdersComponent } from "../views/main/orders/orders/orders.component";
import { TasksComponent } from "../views/main/tasks/tasks/tasks.component";

export const MAIN_ROUTES: Routes = [
    {
        path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardGuard],
    children:[
        {title:'Clientes', path: 'clients', component: ClientsComponent},
        {title:'Pedidos', path: 'orders', component: OrdersComponent},
        {title:'Deudores', path: 'debtors', component: DebtorsComponent},
        {title:'Tareas', path: 'tasks', component: TasksComponent},
        {title:'Presupuesto', path: 'budget', component: TasksComponent},
        {path: 'orders/:id/new', component: NewOrderComponent},
        {path: 'orders/:id/view', component: OrdersDetailsComponent}
    ]},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard]},
    {path: '**', redirectTo: 'home/orders', pathMatch: 'full'}
]