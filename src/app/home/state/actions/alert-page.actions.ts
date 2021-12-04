import { createAction, props } from '@ngrx/store';
import { Alert } from 'src/app/core/modles/alert.model';

export const loadAlerts = createAction(
  '[Alert Page] Load',
  props<{ userId: string }>()
);
