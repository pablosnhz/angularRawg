import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentTmdb } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TmbdService {

  constructor(private httpClient: HttpClient) { }

  // getDates(): Observable<any> {
  //   return this.httpClient.get<any>(environmentTmdb.API_URLBD)
  // }

  setMovies(): Observable<any> {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/discover/movie')
  }
}
