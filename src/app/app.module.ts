import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './views/main/main.module';
import { MaterialModule } from './styles/material/material.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthModule } from './views/auth/auth.module';
import { AdminModule } from './views/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    AuthModule,
    AdminModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
