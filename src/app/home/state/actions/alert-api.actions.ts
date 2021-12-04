import { createAction, props } from '@ngrx/store';
import { Alert } from 'src/app/core/modles/alert.model';

export const loadAlertFailure = createAction(
  '[Alert API] Load Fail',
  props<{ error: string }>()
);

export const loadAlertSuccess = createAction(
  '[Alert API] Load Success',
  props<{ alerts: Alert[] }>()
);
