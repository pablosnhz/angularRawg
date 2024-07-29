import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetails } from 'src/app/core/models/game-details';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private httpClient: HttpClient ) { }

  getGamesById( id: number){
    return this.httpClient.get<GameDetails>(`https://api.rawg.io/api/games/${id}`)
  }


  getIdForHome(){
    return this.httpClient.get<GameDetails>(environment.API_URL + 'games');
  }
}
