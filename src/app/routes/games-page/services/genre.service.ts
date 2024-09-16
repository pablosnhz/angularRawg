import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Genre, SearchResult } from 'src/app/core/models/game';
import { GenresResult } from 'src/app/core/models/genres';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  $genres: WritableSignal<Genre[]> = signal([])
  $loading: WritableSignal<boolean> = signal(false)

  constructor( private httpClient: HttpClient ) { }

  getGenres(): Observable<GenresResult> {
    this.$loading.set(true);
    return this.httpClient.get<GenresResult>(`${environment.API_URL}genres`)
  }

  setGenres(genre: Genre[]) {
    this.$genres.set(genre)
  }
}
