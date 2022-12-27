import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule
    
    
  ],
  exports:[
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule
  ]

})
export class MaterialModule { }
