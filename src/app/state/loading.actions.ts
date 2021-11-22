import { createAction } from '@ngrx/store';

export const showLoading = createAction('[Loading] Loading indicator show');

export const hideLoading = createAction('[Loading] Loading indicator hide');
