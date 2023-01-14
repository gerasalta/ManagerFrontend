import { Routes } from "@angular/router";
import { LoginComponent } from "../views/auth/login/login/login.component";
import { ClientsComponent } from "../views/main/clients/clients/clients.component";
import { HomeComponent } from "../views/main/home/home/home.component";
import { NewOrderComponent } from "../views/main/orders/new-order/new-order.component";
import { OrdersComponent } from "../views/main/orders/orders/orders.component";

export const MAIN_ROUTES: Routes = [
    {
        path: 'home',
    component: HomeComponent,
    children:[
        {title:'Clientes', path: 'clients', component: ClientsComponent},
        {title:'Pedidos', path: 'orders', component: OrdersComponent},
        {path: 'orders/:id/new', component: NewOrderComponent},
    ]},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
]