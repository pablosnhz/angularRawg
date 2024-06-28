import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/shared/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'allApp';

  datos: any = [];

  constructor( private http: HttpService ) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.http.getData().subscribe( (resp: any) => {
      this.datos = resp.results
    })
  }
}
