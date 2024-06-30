// import { HttpClient } from '@angular/common/http';
// import { Injectable, WritableSignal, signal } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.development';
// import { Game, SearchResult } from 'src/app/core/models/game';

// @Injectable({
//   providedIn: 'root'
// })
// export class searchService {

//   constructor( private httpClient: HttpClient ) { }

//   $games: WritableSignal<Game[]> = signal([]);

//   getData():Observable<SearchResult> {
//     return this.httpClient.get<SearchResult>(environment.API_URL + 'games');
//   }

//   setGames( games: Game[] ): void {
//     this.$games.set(games)
//   }
// }
