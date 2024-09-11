import { signal, WritableSignal, Signal, inject } from '@angular/core';
import { Game } from "./game"
import { FavoritesService } from 'src/app/routes/games-page/services/favorites.service';

export class User {
  favorites: Set<Game>;
  favoritesService: FavoritesService;

constructor( favoritesService: FavoritesService, favorites?: Game[] ) {
  this.favoritesService = favoritesService;
  this.favorites = new Set(favorites ?? []);
}

addGame(game: Game) {
  if(this.favorites.has(game)){
    this.favorites.delete(game);
  } else {
    this.favorites.add(game);
  }
  this.favoritesService.set(Array.from(this.favorites));
}

// updateGame(): void {
//   this.favoritesService.update();
// }
}
