import { Injectable } from '@angular/core';
import { User } from '../modles/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  readonly KEY_CURRENT_USER = 'current-user';
  constructor() {}

  setCurrentUser(currentUser: User): User {
    sessionStorage.setItem(this.KEY_CURRENT_USER, JSON.stringify(currentUser));
    return currentUser;
  }

  getCurrentUser(): User {
    return JSON.parse(sessionStorage.getItem(this.KEY_CURRENT_USER)) || null;
  }
}
