import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelfUrl } from 'src/app/core/constants/url.constant';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  pageTitle = 'Sample Player Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate([SelfUrl.LOGIN]);
  }
}
