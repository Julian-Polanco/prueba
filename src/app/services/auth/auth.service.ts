import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/models/user-login';
import { UserLoginSucess } from 'src/app/models/user-login-success';
import { HttpClientService } from '../http-client/http-client.service';
import { ENDPOINTS } from 'src/app/config/endpoints';
import { UserRegister } from 'src/app/models/user-register';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin: any;

  constructor(private httpClientService: HttpClientService, private cookieService: CookieService) { }

  isLoginUser(): UserLoginSucess {
    this.userLogin = this.cookieService.get("login");
    if (this.userLogin) {
      this.userLogin = JSON.parse(this.cookieService.get("login"));;
    }
    return this.userLogin;
  }

  login(user: UserLogin): Observable<any> {
    return this.httpClientService.post<any>(ENDPOINTS.login, user)
  }

  register(user: UserRegister): Observable<any> {
    return this.httpClientService.post<any>(ENDPOINTS.register, user)
  }

  closeSession(): void {
    this.cookieService.delete("login", "/");
    this.cookieService.delete("admin", "/");
    this.cookieService.deleteAll("/", environment.urlBase);
  }

}
