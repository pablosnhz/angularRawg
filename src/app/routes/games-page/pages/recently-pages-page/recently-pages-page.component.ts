import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-recently-pages-page',
  standalone: true,
  templateUrl: '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrls: ['./recently-pages-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameListComponent, SpinnerComponent, CommonModule, ReactiveFormsModule, InfiniteScrollModule],
  providers: [AutoDestroyService]
})
export class RecentlyPagesPageComponent extends AbstractGamesPageComponent{
  override searchDefaultFilters: SearchFilters = {
    ...this.searchDefaultFilters,
    ordering: '-released',
    metacritic: '80,100',
  }

  override abstractPageParams: AbstractGamesPageParams = {
    showFilters: false
  }

  constructor() {
    super();
  }
}
