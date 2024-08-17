import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { Genre } from 'src/app/core/models/genres';
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


  constructor(private router: Router){
    super();
    // this.searchDefaultFilters = {
    //   ...this.searchDefaultFilters,
    // }
  }

  override ngOnInit(): void {
    if(!this.$genres().find((genre) => genre.name.toLowerCase() === this.genre.toLowerCase())){
      this.router.navigate(['/'])
    } else {
      this.setConfigParent();
      super.ngOnInit();
    }
    // console.log(this.genre)
  }

  setConfigParent(): void {
    this.abstractPageParams.title = this.genre.slice(0, 1).toUpperCase() + this.genre.slice(1);

    const genre: Genre = this.$genres().find((genre) => genre.name.toLowerCase() === this.genre.toLowerCase())!;
    this.searchDefaultFilters = {
      ...this.searchDefaultFilters,
      // genres: this.genre
      genres: genre.id.toString()
    }
  }
}

