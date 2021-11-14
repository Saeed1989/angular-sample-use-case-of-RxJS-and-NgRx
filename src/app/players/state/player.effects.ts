import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PlayerService } from '../services/player.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlayerApiActions, PlayerPageActions } from './actions'

@Injectable()
export class PlayerEffects {

  constructor(private actions$: Actions, private playerService: PlayerService) { }

  loadPlayers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PlayerPageActions.loadPlayers),
        mergeMap(() => this.playerService.getPlayers()
          .pipe(
            map(players => PlayerApiActions.loadPlayersSuccess({ players })),
            catchError(error => of(PlayerApiActions.loadPlayersFailure({ error })))
          )
        )
      );
  });

  updatePlayer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PlayerPageActions.updatePlayer),
        concatMap(action =>
          this.playerService.updatePlayer(action.player)
            .pipe(
              map(player => PlayerApiActions.updatePlayerSuccess({ player })),
              catchError(error => of(PlayerApiActions.updatePlayerFailure({ error })))
            )
        )
      );
  });

  createPlayer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PlayerPageActions.createPlayer),
        concatMap(action =>
          this.playerService.createPlayer(action.player)
            .pipe(
              map(player => PlayerApiActions.createPlayerSuccess({ player })),
              catchError(error => of(PlayerApiActions.createPlayerFailure({ error })))
            )
        )
      );
  });

  deletePlayer$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(PlayerPageActions.deletePlayer),
        mergeMap(action =>
          this.playerService.deletePlayer(action.playerId).pipe(
            map(() => PlayerApiActions.deletePlayerSuccess({ playerId: action.playerId })),
            catchError(error => of(PlayerApiActions.deletePlayerFailure({ error })))
          )
        )
      );
  });
}
