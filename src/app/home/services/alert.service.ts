import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Player } from '../../core/modles/player.model';
import { NetworkService } from 'src/app/core/services/network.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';
import { Alert } from 'src/app/core/modles/alert.model';

@Injectable()
export class AlertService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: NetworkService,
    private store: Store<State>
  ) {}

  getAlerts(userId: string): Observable<Alert[]> {
    return this.addLaoding(
      this.networkService.getAlerts(userId).pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  private handleError(err: any) {
    let errorMessage = this.appFetchErrorHandlerService.handleError(err);
    return throwError(errorMessage.friendlyMessage);
  }

  private addLaoding(inpObser$: Observable<any>): Observable<any> {
    this.store.dispatch(LoadingPageActions.showLoading());
    return inpObser$.pipe(
      finalize(() => this.store.dispatch(LoadingPageActions.hideLoading()))
    );
  }
}
