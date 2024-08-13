import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/core/models/game';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres: WritableSignal<Genre[]> = signal([])

  constructor( private httpClient: HttpClient ) { }

  getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`${environment.API_URL}genres`)
  }
}
