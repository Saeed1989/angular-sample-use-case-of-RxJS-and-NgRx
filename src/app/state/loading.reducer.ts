import { User } from '../core/modles/user.model';
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as LoadingActions from './loading.actions';

export interface LoadingSatate {
  isLoading: boolean;
}

const initialState: LoadingSatate = {
    isLoading: false,
};

const getLoadingFeatureState = createFeatureSelector<LoadingSatate>('loading');

export const getCurrentLoading = createSelector(
  getLoadingFeatureState,
  state => state.isLoading
);


export const loadingReducer = createReducer<LoadingSatate>(
  initialState,
  on(LoadingActions.showLoading, (state): LoadingSatate => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LoadingActions.hideLoading, (state): LoadingSatate => {
    return {
      ...state,
      isLoading: false
    };
  })
);
