import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MAIN_ROUTES } from 'src/app/constants/main.routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public routes = this.setRoutes()

  constructor(
    public _cookieService: CookieService,
    public router: Router
  ){}

  ngOnInit(){
  }

  setRoutes(){
    const routes = MAIN_ROUTES.find(r => r.path === 'home')?.children
    return routes.filter(r => r.title)
  }

  async logout(){
    const logout = this._cookieService.delete('access_token', '/')
    window.location.reload()
  }

  navigateToAdmin(){
    this.router.navigate(['admin'])
  }

}
