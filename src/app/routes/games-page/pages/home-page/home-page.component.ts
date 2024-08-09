import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Signal } from '@angular/core';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { HomeService } from '../../services/home.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit{
  slider: any;
  defaultTransform: any;
  $gamesHome = this.homeService.$gamesHome;
  inputFocused: boolean = false;

  $loading: Signal<boolean> = this.homeService.$loading;

  constructor(  private homeService: HomeService,
                private destroy$: AutoDestroyService,
              ){}

  ngOnInit(): void {
    this.slider = document.getElementById("slider");
    this.defaultTransform=0;


    this.homeService.queryString$.pipe(
    distinctUntilChanged(),
    switchMap((title) => this.homeService.searchGames(title)),
    takeUntil(this.destroy$)
  ).subscribe((data) => {
    this.homeService.setGames(data.results)
  })
  // this.getGames();
}

// getGames(){
//   this.searchService.searchGames().pipe(
//     takeUntil(this.destroy$)
//   ).subscribe((data) => {
//     this.searchService.setGames(data.results)
//   })
// }

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
