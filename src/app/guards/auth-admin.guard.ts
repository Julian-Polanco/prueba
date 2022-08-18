import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  
  constructor(private cookieService: CookieService, private router: Router) {}

  redirect(value: boolean) {
    if(!value) this.router.navigate(['/', 'auth', 'login']);
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookie: any = JSON.parse(this.cookieService.get("login"));
      this.redirect(cookie.rol === 2 || cookie.rol === 3);
      return (cookie.rol === 2 || cookie.rol === 3);
  }
  
}
