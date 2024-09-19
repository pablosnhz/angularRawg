import { signal, WritableSignal } from '@angular/core';
import { Game } from "./game"
import { FavoritesService } from 'src/app/routes/games-page/services/favorites.service';
import { GameDetails } from './game-details';
import { Genre } from './genres';

export class User {
  favorites: WritableSignal<Map<number, Game>> = signal(new Map());
  favoriteGenre: WritableSignal<Map<number, Genre>> = signal(new Map());
  favoritesService: FavoritesService;

  constructor(favoritesService: FavoritesService, favorites?: Game[], favoriteGenre?: Genre[]) {
    this.favoritesService = favoritesService;
    this.favorites = signal(new Map(favorites?.map((game) => [game.id, game]) ?? []));
    this.favoriteGenre = signal(new Map(favoriteGenre?.map((genre) => [genre.id, genre]) ?? []));
  }

  addGame(game: Game | GameDetails) {
    if (this.favorites().has(game.id)) {
      this.favorites.update(favorites => {
        favorites.delete(game.id);
        return favorites;
      });
    } else {
      this.favorites.update(favorites => {
        favorites.set(game.id, game as Game);
        return favorites;
      });
    }

    this.favoritesService.set(Array.from(this.favorites().values()));
  }

  addGenre(genre: Genre) {
    if (this.favoriteGenre().has(genre.id)) {
      this.favoriteGenre.update(favorites => {
        favorites.delete(genre.id);
        return favorites;
      });
    } else {
      this.favoriteGenre.update(favorites => {
        favorites.set(genre.id, genre);
        return favorites;
      });
    }

    this.favoritesService.setGenre(genre);
  }
}
