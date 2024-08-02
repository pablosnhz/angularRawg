import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { searchService } from 'src/app/core/utils/common/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GameListComponent } from '../game-list/game-list.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  styleUrls: ['./abstract-games-page.component.scss'],
  standalone: true,
  imports: [SpinnerComponent, GameListComponent, CommonModule, RouterOutlet],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{
  private readonly searchService: searchService = inject(searchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);

  $games: Signal<Game[]> = this.searchService.$games;
  $loading: Signal<boolean> = this.searchService.$loading;

  constructor(){ }

  ngOnInit(): void {
    this.searchService.queryString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((title) => this.searchService.searchGames(title)),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.searchService.setGames(data.results)
    })
  }

}
