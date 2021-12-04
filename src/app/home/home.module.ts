import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(homeRoutes)],
  declarations: [HomeComponent, AlertComponent],
})
export class HomeModule {}
