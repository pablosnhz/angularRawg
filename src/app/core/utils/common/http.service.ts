import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Game, SearchResult } from 'src/app/core/models/game';
import { SearchFilters } from '../../models/search-filters';

@Injectable({
  providedIn: 'root'
})
export class searchService {

constructor( private httpClient: HttpClient ) { }

$games: WritableSignal<Game[]> = signal([]);

private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
public queryString$ = this.queryString.asObservable();

public $loading: WritableSignal<boolean> = signal(false);

public nextUrl: string = '';

searchGames( filters: SearchFilters ):Observable<SearchResult> {
  this.$loading.set(true);
  if (this.nextUrl) {
    return this.httpClient.get<SearchResult>(this.nextUrl)
  }
  const params = new HttpParams({
    fromObject: {
      ...filters
    }
   });
  return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params })
}

setGames( games: Game[] ): void {
  this.$games.update((values: Game[]) => {
    return [...values, ...games]
  })
}


setNextUrl( nextUrl: string ): void {
  this.nextUrl = nextUrl
}

setQueryString( queryString: string ): void {
  this.queryString.next(queryString)
}
}
