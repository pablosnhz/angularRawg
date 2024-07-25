import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { AutoDestroyService } from 'src/app/core/utils/auto-destroy.service';
import { register } from 'swiper/element/bundle';
import { searchService } from '../../services/http.service';
import { InputChangeStyleService } from 'src/app/core/utils/common/input-change-style.service';
import { HomeService } from '../../services/home.service';
register();

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  slider: any;
  defaultTransform: any;
  $gamesHome = this.homeService.$gamesHome;
  inputFocused: boolean = false;


  constructor( private homeService: HomeService, private destroy$: AutoDestroyService, private inputChangeStyleService: InputChangeStyleService ){}

  ngOnInit(): void {

    this.inputChangeStyleService.inputFocused$.subscribe(focused => {
      this.inputFocused = focused;
    });

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
