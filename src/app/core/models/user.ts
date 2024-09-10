import { signal, WritableSignal, Signal } from '@angular/core';
import { Game } from "./game"

export class User {
  favorites: Game[];
  // favorites_genres: Game[]

constructor( favorites: Game[] ){
  // this.favorites = [...favorites];
  this.favorites = []
}

addGame(game: Game) {
  this.favorites.push(game)
}

}
