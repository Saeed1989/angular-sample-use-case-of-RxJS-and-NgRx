import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertApiActions, AlertPageActions } from './actions';
import { AlertService } from '../services/alert.service';

@Injectable()
export class AlertEffects {
  constructor(private actions$: Actions, private alertService: AlertService) {}

  loadAlerts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlertPageActions.loadAlerts),
      concatMap((action) =>
        this.alertService.getAlerts(action.userId).pipe(
          map((alerts) => AlertApiActions.loadAlertSuccess({ alerts })),
          catchError((error) => of(AlertApiActions.loadAlertFailure({ error })))
        )
      )
    );
  });
}
