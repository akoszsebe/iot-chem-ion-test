import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private  authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    const url: string = state.url;
    return true;
    // this.authService.checkAuthentication().map(user => {
    //   if (user !== null) {
    //     localStorage.setItem('name', user.name);
    //     this.authService.setUser(user);
    //   }
    //   if (url === '/login') {
    //     return !user;
    //   } else {
    //     if (user) {
    //       return true;
    //     }
    //     this.authService.redirectUrl = url;
    //     this.router.navigate(['/login']);
    //     return false;
    //   }
    // });
  }
}
