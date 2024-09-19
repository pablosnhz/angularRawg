import { Injectable, signal, WritableSignal } from '@angular/core';
import { Game, Genre } from 'src/app/core/models/game';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  $user: WritableSignal<User>;
  $favoriteGenres: WritableSignal<Genre[]> = signal([]);

  constructor() {
    const storedGenres = JSON.parse(sessionStorage.getItem('genres') || '[]');
    const storedFavorites = this.get();

    this.$user = signal<User>(new User(this, storedFavorites, storedGenres));
    this.$favoriteGenres.set(storedGenres);
  }

  set(favorites: Game[]) {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    this.$user.update(user => {
      user.favorites.set(new Map(favorites.map((game) => [game.id, game])));
      return user;
    });
  }

  get() {
    const inLocalStorage = sessionStorage.getItem('favorites');
    return inLocalStorage ? JSON.parse(inLocalStorage) : [];
  }

  setGenre(newGenre: Genre): void {
    const currentGenres = this.$favoriteGenres();
    const isAlreadyFavorite = currentGenres.some(fav => fav.id === newGenre.id);

    const updatedGenres = isAlreadyFavorite
      ? currentGenres.filter(fav => fav.id !== newGenre.id)
      : [...currentGenres, newGenre];

    this.$favoriteGenres.set(updatedGenres);
    sessionStorage.setItem('genres', JSON.stringify(updatedGenres));

    this.$user.update(user => {
      user.favoriteGenre.set(new Map(updatedGenres.map((genre) => [genre.id, genre])));
      return user;
    });
  }
}
