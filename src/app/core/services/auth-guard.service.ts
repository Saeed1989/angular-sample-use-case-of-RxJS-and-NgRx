import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCurrentUser, UserState } from 'src/app/user/state/user.reducer';
import { SelfUrl } from '../constants/url.constant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<UserState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(getCurrentUser).pipe(
      map((authUser) => {
        console.log(authUser);
        if (!authUser) {
          console.log(authUser);
          this.authService.redirectUrl = routerState.url;
          this.router.navigate([SelfUrl.LOGIN]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
