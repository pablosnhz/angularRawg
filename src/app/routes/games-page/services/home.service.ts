import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, SearchResult } from 'src/app/core/models/game';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private httpClient: HttpClient ) { }

  $gamesHome: WritableSignal<Game[]> = signal([]);

  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public queryString$ = this.queryString.asObservable();

  searchGames( title: string  = '' ):Observable<SearchResult> {
    const params = new HttpParams({ fromObject: { search: title } });
    return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params });
  }

  setGames( games: Game[] ): void {
    this.$gamesHome.set(games)
  }

  setQueryString( queryString: string ): void {
    this.queryString.next(queryString)
  }
  }