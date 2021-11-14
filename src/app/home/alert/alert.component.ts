import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {

  }
}
