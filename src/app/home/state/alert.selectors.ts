import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { AlertState } from './alert.reducer';

export interface State extends AppState.State {
  alerts: AlertState;
}

const getAlertFeatureState = createFeatureSelector<AlertState>('alerts');

export const getAlerts = createSelector(
  getAlertFeatureState,
  (state) => state.alerts
);

export const getError = createSelector(
  getAlertFeatureState,
  (state) => state.error
);
