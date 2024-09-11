import { ChangeDetectionStrategy, Component, computed, signal, Signal } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameListComponent } from "../../../../shared/game-list/game-list.component";
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  standalone: true,
  imports: [GameListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  // $games: Signal<Game[]> = computed(() => this.favoritesService.$user().favorites ?? []);

  $games: Signal<Game[]> = computed(() => Array.from(this.favoritesService.$user().favorites ?? []));

  constructor( private favoritesService: FavoritesService ){}
}
