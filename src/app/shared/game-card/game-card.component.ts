import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input({ required: true }) gameCard: Game;
}
