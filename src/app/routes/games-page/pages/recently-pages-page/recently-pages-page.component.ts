import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
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
  imports: [GameListComponent, SpinnerComponent, CommonModule, ReactiveFormsModule],
  providers: [AutoDestroyService]
})
export class RecentlyPagesPageComponent extends AbstractGamesPageComponent{
  override searchFilters: SearchFilters = {
    ...this.searchFilters,
    ordering: '-released',
    metacritic: '80,100'
  }

  constructor() {
    super();
  }
}
