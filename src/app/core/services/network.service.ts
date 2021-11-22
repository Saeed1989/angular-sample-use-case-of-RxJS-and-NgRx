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
    return this.http.get<Player[]>(`/api/players`);
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`/api/players/${id}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>('/api/players', player);
  }

  updatePlayer(updatedPlayer: Player): Observable<void> {
    return this.http.patch<void>(
      `/api/players/${updatedPlayer.id}`,
      updatedPlayer
    );
  }

  deletePlayer(playerID: number): Observable<void> {
    return this.http.delete<void>(`/api/players/${playerID}`);
  }
}
