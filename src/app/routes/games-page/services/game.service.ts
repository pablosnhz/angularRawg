import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameDetails } from 'src/app/core/models/game-details';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private httpClient: HttpClient ) { }

  getGamesById( id: number){
    return this.httpClient.get<GameDetails>(`https://api.rawg.io/api/games/${id}`)
  }
}
