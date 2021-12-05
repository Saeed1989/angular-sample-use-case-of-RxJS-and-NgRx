import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlayerShellComponent } from './player-shell.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { PlayerService } from './services/player.service';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './state/player.effects';

const playerRoutes: Routes = [{ path: '', component: PlayerShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(playerRoutes),
    StoreModule.forFeature('players', playerReducer),
    EffectsModule.forFeature([PlayerEffects]),
  ],
  declarations: [
    PlayerShellComponent,
    PlayerListComponent,
    PlayerEditComponent,
  ],
  providers: [PlayerService],
})
export class PlayerModule {}
