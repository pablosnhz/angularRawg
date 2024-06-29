import { Component, OnInit } from '@angular/core';
import { searchService } from '../../services/http.service';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit{
  constructor( private searchService: searchService, private destroy$: AutoDestroyService ){}

  datos: any = [];

  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this.searchService.getData().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.datos = data.results
    })
  }

}
