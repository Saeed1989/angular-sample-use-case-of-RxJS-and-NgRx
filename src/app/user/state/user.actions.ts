import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/modles/user.model';

export const maskUserName = createAction('[User] Mask User Name');

export const setCurrentUser = createAction(
  '[User] Set Current User',
  props<{ currentUser: User }>()
);
