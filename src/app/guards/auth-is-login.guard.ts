import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthIsLoginGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  redirect(value: boolean) {
    if(!value) this.router.navigate(['/']);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.redirect(!this.cookieService.check("login"));
      return !this.cookieService.check("login");
  }
  
}
