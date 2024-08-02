import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputChangeStyleService } from '../utils/common/input-change-style.service';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from 'src/app/routes/games-page/pages/home-page/home-page.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HomePageComponent, TopBarComponent ]
})
export class MainLayoutComponent implements OnInit {

  inputFocused: boolean = false;

  constructor(private inputChangeStyleService: InputChangeStyleService) {}

  ngOnInit(): void {
    this.inputChangeStyleService.inputFocused$.subscribe(focused => {
      this.inputFocused = focused;
    });
  }
}
