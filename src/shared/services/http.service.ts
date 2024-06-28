import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SearchResult } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private httpClient: HttpClient ) { }

  getData():Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(environment.API_URL + 'games');
  }
}
