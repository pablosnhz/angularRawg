import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { GameDetails } from 'src/app/core/models/game-details';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor( private httpClient: HttpClient ) { }

  getGamesById( id: number){
    this.$loading.set(true);
    return this.httpClient.get<GameDetails>(`https://api.rawg.io/api/games/${id}`)
  }
}
