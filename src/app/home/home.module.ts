import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from '../core/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home.component';
import { AlertService } from './services/alert.service';
import { AlertEffects } from './state/alert.effects';
import { alertReducer } from './state/alert.reducer';

const homeRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(homeRoutes),
    StoreModule.forFeature('alerts', alertReducer),
    EffectsModule.forFeature([AlertEffects]),
  ],
  declarations: [HomeComponent, AlertComponent],
  providers: [AlertService],
})
export class HomeModule {}
