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
  const currentGenres = this.favoriteGenre();

  if (currentGenres.has(genre.id)) {
    // Si ya existe, lo eliminamos
    this.favoriteGenre.update((genres) => {
      genres.delete(genre.id);
      return genres;
    });
  } else {
    // Si no existe, lo agregamos
    this.favoriteGenre.update((genres) => {
      genres.set(genre.id, genre);
      return genres;
    });
  }

  const updatedGenres = Array.from(this.favoriteGenre().values());

  this.favoritesService.setGenre(genre);
  sessionStorage.setItem('genres', JSON.stringify(updatedGenres));

  console.log(`Favoritos actualizados: ${updatedGenres.map(g => g.name)}`);
}



}
