import { Player } from '../../../core/modles/player.model';
import { createAction, props } from '@ngrx/store';

export const loadPlayersSuccess = createAction(
  '[Player API] Load Success',
  props<{ players: Player[] }>()
);

export const loadPlayersFailure = createAction(
  '[Player API] Load Fail',
  props<{ error: string }>()
);

export const updatePlayerSuccess = createAction(
  '[Player API] Update Player Success',
  props<{ player: Player }>()
);

export const updatePlayerFailure = createAction(
  '[Player API] Update Player Fail',
  props<{ error: string }>()
);

export const createPlayerSuccess = createAction(
  '[Player API] Create Player Success',
  props<{ player: Player }>()
);

export const createPlayerFailure = createAction(
  '[Player API] Create Player Fail',
  props<{ error: string }>()
);

export const deletePlayerSuccess = createAction(
  '[Player API] Delete Player Success',
  props<{ playerId: number }>()
);

export const deletePlayerFailure = createAction(
  '[Player API] Delete Player Fail',
  props<{ error: string }>()
);
