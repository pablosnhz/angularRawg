import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-games-page',
  templateUrl: '../../../../shared/abstract-games-page/abstract-games-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./games-page.component.scss'],
  standalone: true,
  imports: [GameListComponent, SpinnerComponent, CommonModule, ReactiveFormsModule],
  providers: [AutoDestroyService]
})
export class GamesPageComponent extends AbstractGamesPageComponent {
  constructor(){
    super();
  }
// constructor( private searchService: searchService, private destroy$: AutoDestroyService ){}

// $games = this.searchService.$games;
// $loading: Signal<boolean> = this.searchService.$loading;

// ngOnInit(): void {
//   this.searchService.queryString$.pipe(
//     distinctUntilChanged(),
//     switchMap((title) => this.searchService.searchGames(title)),
//     takeUntil(this.destroy$)
//   ).subscribe((data) => {
//     this.searchService.setGames(data.results)
//   })
//   // this.getGames();
// }

// getGames(){
//   this.searchService.searchGames().pipe(
//     takeUntil(this.destroy$)
//   ).subscribe((data) => {
//     this.searchService.setGames(data.results)
//   })
// }
}
