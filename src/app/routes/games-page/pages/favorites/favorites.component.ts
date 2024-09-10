import { ChangeDetectionStrategy, Component, signal, Signal } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameListComponent } from "../../../../shared/game-list/game-list.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [GameListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  $games: Signal<Game[]> = signal([])

}
