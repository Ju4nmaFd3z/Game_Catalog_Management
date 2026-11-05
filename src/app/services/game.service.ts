import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  // GET /games
  getGames() {
    return this.http.get<Game[]>(this.apiUrl);
  }

  // POST /games
  createGame(game: Game) {
    return this.http.post<Game>(this.apiUrl, game);
  }

  // PUT /games/:id
  updateGame(game: Game) {
    return this.http.put<Game>(`${this.apiUrl}/${game.id}`, game);
  }
}
