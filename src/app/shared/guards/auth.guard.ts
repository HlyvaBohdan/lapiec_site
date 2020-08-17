import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
loginStatus:boolean
  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }
  
  checkLogin(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null && user.role == 'admin') {
      this.loginStatus = true;
      return true;
    }
    else {
      this.router.navigateByUrl('login');
      this.loginStatus = false;
      return false
    }
  }
}
