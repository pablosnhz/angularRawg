import { Component, OnInit } from '@angular/core';
// import { searchService } from '../../services/http.service';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { TmbdService } from '../../services/tmbd.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit{
  constructor(
              // private searchService: searchService,
              private destroy$: AutoDestroyService,
              private tmbdService: TmbdService ){}

  // $games = this.searchService.$games;
  datos: any = [];

  ngOnInit(): void {
    // this.getGames();

    // this.getDatesBD();

    this.getMovies();
  }

  // getGames(){
  //   this.searchService.getData().pipe(
  //     takeUntil(this.destroy$)
  //   ).subscribe((data) => {
  //     this.searchService.setGames(data.results)
  //   })
  // }

  // getDatesBD(): any{
  //   this.tmbdService.getDates().pipe(
  //     takeUntil(this.destroy$)
  //   ).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

  getMovies(): any{
    this.tmbdService.setMovies().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: any) => {
      this.datos = data
      console.log(data)
    })
  }

}
