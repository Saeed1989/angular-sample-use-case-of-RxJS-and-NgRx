import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Player } from '../../core/modles/player';
import { NetworkService } from 'src/app/core/services/network.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private http: HttpClient,
    private networkService: NetworkService
  ) {}

  getPlayers(): Observable<Player[]> {
    return this.networkService.getAllPlayers().pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createPlayer(player: Player): Observable<Player> {
    // Player Id must be null for the Web API to assign an Id
    const newPlayer = { ...player, id: null };
    return this.networkService.addPlayer(newPlayer).pipe(
      tap((data) => console.log('createPlayer: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deletePlayer(id: number): Observable<void> {
    return this.networkService.deletePlayer(id).pipe(
      tap((data) => console.log('deletePlayer: ' + id)),
      catchError(this.handleError)
    );
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.networkService.updatePlayer(player).pipe(
      tap(() => console.log('updatePlayer: ' + player.id)),
      // Return the player on an update
      map(() => player),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
