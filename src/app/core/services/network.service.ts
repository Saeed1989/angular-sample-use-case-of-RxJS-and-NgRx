import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Player } from '../modles/player';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private http: HttpClient) {}

  getAllPlayers(): Observable<Player[]> {
    console.log('Getting all player from the server.');
    return this.http.get<Player[]>(`/api/player`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'my-token',
      }),
    });
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`/api/player/${id}`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
        Authorization: 'my-token',
      }),
    });
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/player', player, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updatePlayer(updatedPlayer: Player): Observable<void> {
    return this.http.put<void>(
      `/api/player/${updatedPlayer.id}`,
      updatedPlayer,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  deletePlayer(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/player/${bookID}`);
  }
}