import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Player } from '../../core/modles/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersUrl = 'api/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createPlayer(player: Player): Observable<Player> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Player Id must be null for the Web API to assign an Id
    const newPlayer = { ...player, id: null };
    return this.http.post<Player>(this.playersUrl, newPlayer, { headers })
      .pipe(
        tap(data => console.log('createPlayer: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deletePlayer(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.playersUrl}/${id}`;
    return this.http.delete<Player>(url, { headers })
      .pipe(
        tap(data => console.log('deletePlayer: ' + id)),
        catchError(this.handleError)
      );
  }

  updatePlayer(player: Player): Observable<Player> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.playersUrl}/${player.id}`;
    return this.http.put<Player>(url, player, { headers })
      .pipe(
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
