import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import { Player } from '../../core/modles/player.model';
import { NetworkService } from 'src/app/core/services/network.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import * as LoadingPageActions from 'src/app/state/loading.actions';
import { AppFetchErrorHandlerService } from 'src/app/core/services/fetch-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private appFetchErrorHandlerService: AppFetchErrorHandlerService,
    private networkService: NetworkService,
    private store: Store<State>
  ) {}

  getPlayers(): Observable<Player[]> {
    return this.addLaoding(
      this.networkService.getAllPlayers().pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  createPlayer(player: Player): Observable<Player> {
    // Player Id must be null for the Web API to assign an Id
    const newPlayer = { ...player, id: null };
    return this.addLaoding(
      this.networkService.addPlayer(newPlayer).pipe(
        tap((data) => console.log('createPlayer: ' + JSON.stringify(data))),
        catchError(this.handleError.bind(this))
      )
    );
  }

  deletePlayer(id: number): Observable<void> {
    return this.addLaoding(
      this.networkService.deletePlayer(id).pipe(
        tap((data) => console.log('deletePlayer: ' + id)),
        catchError(this.handleError.bind(this))
      )
    );
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.addLaoding(
      this.networkService.updatePlayer(player).pipe(
        tap(() => console.log('updatePlayer: ' + player.id)),
        // Return the player on an update
        map(() => player),
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
