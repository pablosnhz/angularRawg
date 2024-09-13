import { signal, WritableSignal } from '@angular/core';
import { Game } from "./game"
import { FavoritesService } from 'src/app/routes/games-page/services/favorites.service';
import { GameDetails } from './game-details';

export class User {
  favorites: WritableSignal<Map<number, Game>> = signal(new Map());
  favoritesService: FavoritesService;

constructor( favoritesService: FavoritesService, favorites?: Game[]) {
  this.favoritesService = favoritesService;
  this.favorites = signal(new Map(favorites?.map((game) => [game.id, game]) ?? []));
}

// agregue Game que es que vienen todos los juegos, pero tambien GameDetails que son los que vienen por ID
addGame(game: Game | GameDetails) {
  if (this.favorites().has(game.id)) {
    // delete refresh
    this.favorites.update((favorites) => {
      this.favorites().delete(game.id);
      return favorites
    });
  } else {
    this.favorites.update((favorites) => {
      // this.favorites().add(game);
      this.favorites().set(game.id, game as Game || game as GameDetails);
      return favorites
    });
  }
  this.favoritesService.set(Array.from(this.favorites().values()));
}
}
