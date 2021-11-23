import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { setCurrentUser } from 'src/app/user/state/user.actions';
import { getCurrentUser, userReducer } from 'src/app/user/state/user.reducer';
import { User } from '../modles/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null;
  redirectUrl: string;

  constructor(private store: Store<State>) {
    this.store
      .select(getCurrentUser)
      .subscribe((currUser) => (this.currentUser = currUser));
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    let currentUser = {
      id: 2,
      userName,
      isAdmin: false,
    };
    this.store.dispatch(setCurrentUser({ currentUser: currentUser }));
  }

  logout(): void {
    let currentUser = null;
    this.store.dispatch(setCurrentUser({ currentUser: currentUser }));
  }
}
