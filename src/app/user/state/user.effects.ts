import { Injectable } from '@angular/core';
import { mergeMap, map, catchError, concatMap, tap, exhaustMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAction from './user.actions';
import { SessionStorageService } from 'src/app/core/services/sessiont-storage.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private ssService: SessionStorageService
  ) {}

  setUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAction.setCurrentUser),
      exhaustMap(currUser =>
        from(this.ssService.setCurrentUser(currUser) as any);
      )
    );
  });
}
