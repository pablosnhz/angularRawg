import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input({ required: true }) gamesList: Game[] = [];
}
