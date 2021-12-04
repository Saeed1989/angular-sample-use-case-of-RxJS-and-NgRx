import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { PlayerState } from './player.reducer';

export interface State extends AppState.State {
  players: PlayerState;
}

const getPlayerFeatureState = createFeatureSelector<PlayerState>('players');

export const getShowPlayerCode = createSelector(
  getPlayerFeatureState,
  (state) => state.showPlayerCode
);

export const getCurrentPlayerId = createSelector(
  getPlayerFeatureState,
  (state) => state.currentPlayerId
);

export const getCurrentPlayer = createSelector(
  getPlayerFeatureState,
  getCurrentPlayerId,
  (state, currentPlayerId) => {
    if (currentPlayerId === 0) {
      return {
        id: 0,
        playerName: '',
        jerseyNumber: '',
        description: '',
        starRating: 0,
      };
    } else {
      return currentPlayerId
        ? state.players.find((p) => p.id === currentPlayerId)
        : null;
    }
  }
);

export const getPlayers = createSelector(
  getPlayerFeatureState,
  (state) => state.players
);

export const getError = createSelector(
  getPlayerFeatureState,
  (state) => state.error
);
