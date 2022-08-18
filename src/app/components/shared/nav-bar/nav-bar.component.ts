import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

const ADMIN_SUPERADMIN_ROL = [2, 3];
const INVALID_DATA = [null, undefined, "", "null", "undefined"];

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output()
  public sidenavToggle = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  public onToggleSidenav = (): void => {
    this.sidenavToggle.emit();
  }

  closeSession(): void {
    this.authService.closeSession();
    this.router.navigate(['/']);
  }

  get isAdminOrSuperadmin(): boolean {
    return ADMIN_SUPERADMIN_ROL.includes(this.authService.isLoginUser().rol);
  }

  get isLogin(): boolean {
    return !INVALID_DATA.includes(String(this.authService.isLoginUser()));
  }

}
