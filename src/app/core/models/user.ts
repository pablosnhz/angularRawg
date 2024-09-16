import { signal, WritableSignal } from '@angular/core';
import { Game } from "./game"
import { FavoritesService } from 'src/app/routes/games-page/services/favorites.service';
import { GameDetails } from './game-details';
import { Genre } from './genres';

export class User {
  favorites: WritableSignal<Map<number, Game>> = signal(new Map());
  favoriteGenre: WritableSignal<Map<number, Genre>> = signal(new Map());
  favoritesService: FavoritesService;

constructor( favoritesService: FavoritesService, favorites?: Game[], favoriteGenre?: Genre[]) {
  this.favoritesService = favoritesService;
  this.favorites = signal(new Map(favorites?.map((game) => [game.id, game]) ?? []));
  this.favoriteGenre = signal(new Map(favoriteGenre?.map((game) => [game.id, game]) ?? []));
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

addGenre(genre: Genre) {
  if (this.favoriteGenre().has(genre.id)) {
    // delete refresh
    this.favorites.update((favorites) => {
      this.favoriteGenre().delete(genre.id);
      return favorites
    });
  } else {
    this.favorites.update((favorites) => {
      // this.favorites().add(game);
      this.favoriteGenre().set(genre.id, genre as Genre);
      return favorites
    });
  }
// this.favoritesService.setGenre(genre);
this.favoritesService.$favoriteGenres.set(Array.from(this.favoriteGenre().values()));
console.log(this.favoriteGenre().values());

}
}
