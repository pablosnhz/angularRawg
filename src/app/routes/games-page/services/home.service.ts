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
  $gamesHomeRating: WritableSignal<Game[]> = signal([]);
  $gamesHomeWeek: WritableSignal<Game[]> = signal([]);

  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public queryString$ = this.queryString.asObservable();

  public $loading: WritableSignal<boolean> = signal(false);

  // slider automatico
  searchGames( title: string  = '' ):Observable<SearchResult> {
    this.$loading.set(true);
    const params = new HttpParams({
      fromObject: {
        search: title,
        ordering: '-rating',
        page_size: 10,
        metacritic: '80,100'
      }
    });
    return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params });
  }

  // primer slider manual
  ListGamesRating(title: string = ''): Observable<SearchResult>{
    const params = new HttpParams({
      fromObject: {
        search: title,
        ordering: '-added',
        page_size: 10,
        metacritic: '80,100'
      }
    })
    return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params })
  }

  // segundo slider manual
  // ! VER WEEK NO ME TRAE RESULTADOS CORRECTOS
  ListGamesWeek(title: string = ''): Observable<SearchResult> {
    const params = new HttpParams({
      fromObject: {
        search: title,
        ordering: '-updated',
        page_size: 10,
        updated: `${new Date().setDate(new Date().getDate() - 7), new Date().setDate(new Date().getDate() - 1)}`,
        // metacritic: '80,100'
      }
    });
    return this.httpClient.get<SearchResult>(environment.API_URL + 'games', { params });
  }


  setGames( games: Game[] ): void {
    this.$gamesHome.set(games)
  }

  setGamesRating( games: Game[] ): void {
    this.$gamesHomeRating.set(games)
  }

  setGamesWeek( games: Game[] ): void {
    this.$gamesHomeWeek.set(games)
  }

  setQueryString( queryString: string ): void {
    this.queryString.next(queryString)
  }
  }
