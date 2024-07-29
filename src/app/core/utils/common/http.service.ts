import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Game, SearchResult } from 'src/app/core/models/game';

@Injectable({
  providedIn: 'root'
})
export class searchService {

constructor( private httpClient: HttpClient ) { }

$games: WritableSignal<Game[]> = signal([]);

private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
public queryString$ = this.queryString.asObservable();

searchGames( title: string  = '' ):Observable<SearchResult> {
  const params = new HttpParams({ fromObject: { search: title } });
  return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params });
}

setGames( games: Game[] ): void {
  this.$games.set(games)
}
setQueryString( queryString: string ): void {
  this.queryString.next(queryString)
}
}
