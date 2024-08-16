import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-genre-dates',
  templateUrl: '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrls: ['./genre-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SpinnerComponent, GameListComponent, CommonModule, RouterOutlet, ReactiveFormsModule, InfiniteScrollModule]
})
export class GenreDatesComponent extends AbstractGamesPageComponent implements OnInit{
  @Input('genre') genre: string;

  override searchDefaultFilters: SearchFilters = {
    ...this.searchDefaultFilters,
  }

  override abstractPageParams: AbstractGamesPageParams = {
    showTitle: true,
    showFilters: false,
    title: 'Genre'
  }

  constructor(){
    super();
    this.searchDefaultFilters = {
      ...this.searchDefaultFilters,
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setConfigParent();
    console.log(this.genre)
  }

  setConfigParent(): void {
    this.abstractPageParams.title = this.genre;
    this.searchDefaultFilters = {
      ...this.searchDefaultFilters,
      genres: this.genre
    }
  }
}
