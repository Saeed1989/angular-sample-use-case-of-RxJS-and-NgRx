import { Player } from '../../../core/modles/player';
import { createAction, props } from '@ngrx/store';

export const togglePlayerCode = createAction(
  '[Player Page] Toggle Jersey Number'
);

export const setCurrentPlayer = createAction(
  '[Player Page] Set Current Player',
  props<{ currentPlayerId: number }>()
);

export const clearCurrentPlayer = createAction(
  '[Player Page] Clear Current Player'
);

export const initializeCurrentPlayer = createAction(
  '[Player Page] Initialize Current Player'
);

export const loadPlayers = createAction('[Player Page] Load');

export const updatePlayer = createAction(
  '[Player Page] Update Player',
  props<{ player: Player }>()
);

export const createPlayer = createAction(
  '[Player Page] Create Player',
  props<{ player: Player }>()
);

export const deletePlayer = createAction(
  '[Player Page] Delete Player',
  props<{ playerId: number }>()
);
