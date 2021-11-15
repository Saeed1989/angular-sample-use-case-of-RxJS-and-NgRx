import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(homeRoutes)],
  declarations: [HomeComponent, AlertComponent],
})
export class HomeModule {}
