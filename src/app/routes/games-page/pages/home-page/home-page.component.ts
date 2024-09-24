import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, Signal } from '@angular/core';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { HomeService } from '../../services/home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { GameDetails } from 'src/app/core/models/game-details';
import { FavoritesService } from '../../services/favorites.service';
import { User } from 'src/app/core/models/user';
import { Game } from 'src/app/core/models/game';
register();

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AutoDestroyService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit{
  slider: any;
  defaultTransform: any;

  $gamesHome = this.homeService.$gamesHome;
  $gamesHomeTrending = this.homeService.$gamesHomeRating;
  $gamesListWeek = this.homeService.$gamesHomeWeek;
  $loading: Signal<boolean> = this.homeService.$loading;
  $user: Signal<User | null> = this.favoritesService.$user;

  gamesHome: Game[] = [];

  inputFocused: boolean = false;

  $favorites: Signal<boolean> = computed(() => {
    const user = this.favoritesService.$user();
    if (!this.gamesHome || !user) {
      return false;
    }
    return user.favorites().has(this.gamesHome[0]?.id);
  });

  constructor(  private homeService: HomeService,
                private destroy$: AutoDestroyService,
                private favoritesService: FavoritesService
              ){}

  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.defaultTransform=0;

    this.getGames();
    this.getGamesRating();
    this.getGamesWeek();
}

addGameToFavorites(game: Game): void {
  this.$user()?.addGame(game);
  // console.log(this.$user()?.favorites());
}

getGames(){
  this.homeService.queryString$.pipe(
    distinctUntilChanged(),
    switchMap((title) => this.homeService.searchGames(title)),
    takeUntil(this.destroy$)
  ).subscribe((data) => {
    this.homeService.setGames(data.results)
  })
}

getGamesRating(){
  this.homeService.queryString$.pipe(
    // distinctUntilChanged(),
    switchMap((title) => this.homeService.ListGamesRating(title)),
    takeUntil(this.destroy$)
  ).subscribe((data) => {
    this.homeService.setGamesRating(data.results)
  })
}

getGamesWeek(){
  this.homeService.queryString$.pipe(
    // distinctUntilChanged(),
    switchMap((title) => this.homeService.ListGamesWeek(title)),
    takeUntil(this.destroy$)
  ).subscribe((data) => {
    this.homeService.setGamesWeek(data.results)
  })
}

goNext() {
  this.defaultTransform = this.defaultTransform - 398;
  if (Math.abs(this.defaultTransform) >= this.slider.scrollWidth / 1.7) this.defaultTransform = 0;
  this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
}

goPrev() {
  if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
  else this.defaultTransform = this.defaultTransform + 398;
  this.slider.style.transform = "translateX(" + this.defaultTransform + "px)";
}
}
