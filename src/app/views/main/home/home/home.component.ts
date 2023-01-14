import { Component } from '@angular/core';
import { MAIN_ROUTES } from 'src/app/constants/main.routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public routes = this.setRoutes()

  constructor(){}

  ngOnInit(){
  }

  setRoutes(){
    const routes = MAIN_ROUTES.find(r => r.path === 'home')?.children
    return routes.filter(r => r.title)
  }

}
