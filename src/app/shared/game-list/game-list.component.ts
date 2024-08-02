import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Game } from 'src/app/core/models/game';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-list.component.scss'],
  standalone: true,
  imports: [ CommonModule, RouterOutlet, GameCardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GameListComponent {
  $loading: Signal<boolean> = signal(false);

  @Input({ required: true }) gamesList: Game[] = [];
}
