import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { Game } from 'src/app/core/models/game';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { searchService } from 'src/app/core/utils/common/http.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { GameListComponent } from '../game-list/game-list.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchFilters } from 'src/app/core/models/search-filters';

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

  searchFilters: SearchFilters = {
    search: '',
    page_size: 50,
  }

  constructor(){ }

  ngOnInit(): void {
    this.searchService.queryString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((query: string) => (this.searchFilters.search = query)),
      switchMap((title: string) => this.searchService.searchGames(this.searchFilters)),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.searchService.setGames(data.results)
    })
  }

}
