import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../core/modles/player.model';
import { Store } from '@ngrx/store';
import {
  State,
  getShowPlayerCode,
  getCurrentPlayer,
  getPlayers,
  getError,
} from './state/player.selectors';
import { PlayerPageActions } from './state/actions';

@Component({
  templateUrl: './player-shell.component.html',
})
export class PlayerShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  players$: Observable<Player[]>;
  selectedPlayer$: Observable<Player>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(PlayerPageActions.loadPlayers());
    this.players$ = this.store.select(getPlayers);
    this.errorMessage$ = this.store.select(getError);
    this.selectedPlayer$ = this.store.select(getCurrentPlayer);
    this.displayCode$ = this.store.select(getShowPlayerCode);
  }

  checkChanged(): void {
    this.store.dispatch(PlayerPageActions.togglePlayerCode());
  }

  newPlayer(): void {
    this.store.dispatch(PlayerPageActions.initializeCurrentPlayer());
  }

  playerSelected(player: Player): void {
    this.store.dispatch(
      PlayerPageActions.setCurrentPlayer({ currentPlayerId: player.id })
    );
  }

  deletePlayer(player: Player): void {
    if (player && player.id) {
      if (confirm(`Really delete the player: ${player.playerName}?`)) {
        this.store.dispatch(
          PlayerPageActions.deletePlayer({ playerId: player.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(PlayerPageActions.clearCurrentPlayer());
    }
  }

  savePlayer(player: Player): void {
    if (player) {
      this.store.dispatch(PlayerPageActions.createPlayer({ player }));
    }
  }

  updatePlayer(player: Player): void {
    if (player) {
      this.store.dispatch(PlayerPageActions.updatePlayer({ player }));
    }
  }
}
