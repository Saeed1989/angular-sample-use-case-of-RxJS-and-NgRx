import { Player } from '../../core/modles/player';
import { PlayerApiActions, PlayerPageActions } from './actions';
import { createReducer, on } from '@ngrx/store';

export interface PlayerState {
  showPlayerCode: boolean;
  currentPlayerId: number | null;
  players: Player[];
  error: string;
}

const initialState: PlayerState = {
  showPlayerCode: true,
  currentPlayerId: null,
  players: [],
  error: '',
};

export const playerReducer = createReducer<PlayerState>(
  initialState,
  on(PlayerPageActions.togglePlayerCode, (state): PlayerState => {
    return {
      ...state,
      showPlayerCode: !state.showPlayerCode,
    };
  }),
  on(PlayerPageActions.setCurrentPlayer, (state, action): PlayerState => {
    return {
      ...state,
      currentPlayerId: action.currentPlayerId,
    };
  }),
  on(PlayerPageActions.clearCurrentPlayer, (state): PlayerState => {
    return {
      ...state,
      currentPlayerId: null,
    };
  }),
  on(PlayerPageActions.initializeCurrentPlayer, (state): PlayerState => {
    return {
      ...state,
      currentPlayerId: 0,
    };
  }),
  on(PlayerApiActions.loadPlayersSuccess, (state, action): PlayerState => {
    return {
      ...state,
      players: action.players,
      error: '',
    };
  }),
  on(PlayerApiActions.loadPlayersFailure, (state, action): PlayerState => {
    return {
      ...state,
      players: [],
      error: action.error,
    };
  }),
  on(PlayerApiActions.updatePlayerSuccess, (state, action): PlayerState => {
    const updatedPlayers = state.players.map((item) =>
      action.player.id === item.id ? action.player : item
    );
    return {
      ...state,
      players: updatedPlayers,
      currentPlayerId: action.player.id,
      error: '',
    };
  }),
  on(PlayerApiActions.updatePlayerFailure, (state, action): PlayerState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a create, the currentPlayer is the new player.
  on(PlayerApiActions.createPlayerSuccess, (state, action): PlayerState => {
    return {
      ...state,
      players: [...state.players, action.player],
      currentPlayerId: action.player.id,
      error: '',
    };
  }),
  on(PlayerApiActions.createPlayerFailure, (state, action): PlayerState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  // After a delete, the currentPlayer is null.
  on(PlayerApiActions.deletePlayerSuccess, (state, action): PlayerState => {
    return {
      ...state,
      players: state.players.filter((player) => player.id !== action.playerId),
      currentPlayerId: null,
      error: '',
    };
  }),
  on(PlayerApiActions.deletePlayerFailure, (state, action): PlayerState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
