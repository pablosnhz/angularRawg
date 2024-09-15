import { Injectable, signal, WritableSignal } from '@angular/core';
import { Game, Genre } from 'src/app/core/models/game';
import { GameDetails } from 'src/app/core/models/game-details';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  $user: WritableSignal<User>;

  constructor() {
    this.$user = signal<User>(new User(this, this.get()));

    // al poner el signal para getGenre se fusiona con el signal de $user y salta error en el card normal
    // this.$user = signal<User>(new User(this, this.getGenre()));
  }

  set(favorites: Game[]){
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    this.$user.set(new User(this, favorites));
  }

  setGenres(genres: Genre[]){
    sessionStorage.setItem('genres', JSON.stringify(genres));
    this.$user.set(new User(this, this.get()));
  }

  getGenre(){
    const inLocalStorageGenre = sessionStorage.getItem('genres');
    if(inLocalStorageGenre){
      return JSON.parse(inLocalStorageGenre);
    }
    return [];
  }

  get(){
    const inLocalStorage = sessionStorage.getItem('favorites');
    if(inLocalStorage){
      return JSON.parse(inLocalStorage);
    }
    return [];
  }
}
