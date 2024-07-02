import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { searchService } from 'src/app/routes/games-page/services/http.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPageComponent implements OnInit{
  constructor(
              private searchService: searchService,
              private destroy$: AutoDestroyService ){}

  $games = this.searchService.$games;

  ngOnInit(): void {
    this.getGames();
  }

  getGames(){
    this.searchService.getData().pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.searchService.setGames(data.results)
    })
  }

}
