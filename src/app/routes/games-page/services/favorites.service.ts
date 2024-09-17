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
    this.$user = signal<User>(new User(this, this.get(), this.getGenre()));
    this.$favoriteGenres = signal<Genre[]>(JSON.parse(sessionStorage.getItem('genres') || '[]'));
  }

  set(favorites: Game[]){
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    this.$user.set(new User(this, favorites));
  }

  get(){
    const inLocalStorage = sessionStorage.getItem('favorites');
    if(inLocalStorage){
      return JSON.parse(inLocalStorage);
    }
    return [];
  }

  getGenre(){
    const inLocalStorageItem = sessionStorage.getItem('genres');
    if(inLocalStorageItem){
      return JSON.parse(inLocalStorageItem);
    }
    return [];
  }

  setGenre(newGenre: Genre): void {
    const currentGenres = this.$favoriteGenres();
    const isAlreadyFavorite = currentGenres.some(fav => fav.id === newGenre.id);

    if (!isAlreadyFavorite) {
      const updatedGenres = [...currentGenres, newGenre];
      this.$favoriteGenres.set(updatedGenres);
      sessionStorage.setItem('genres', JSON.stringify(updatedGenres));

      this.$user.update((user) => new User(this, this.get(), updatedGenres));
    } else {
      const updatedGenres = currentGenres.filter(fav => fav.id !== newGenre.id);
      this.$favoriteGenres.set(updatedGenres);
      sessionStorage.setItem('genres', JSON.stringify(updatedGenres));

      this.$user.update((user) => new User(this, this.get(), updatedGenres));
    }
  }

}

