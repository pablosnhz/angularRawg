import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, Input, Signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Game } from 'src/app/core/models/game';
import { FavoritesService } from 'src/app/routes/games-page/services/favorites.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-card.component.scss'],
  standalone: true,
  imports: [ RouterModule, CommonModule, RouterLink],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GameCardComponent {
  @Input({ required: true }) gameCard: Game;
  $user: Signal<User | null> = this.favoriteService.$user;

  // para el boton de clases y favoritos
  $favorites: Signal<boolean> = computed(() => {
    Array.from(this.favoriteService.$user().favorites().values() ?? new Set())
    return this.favoriteService.$user().favorites().has(this.gameCard.id);
  }
);

  constructor(private favoriteService: FavoritesService) { }

  addGameToFavorites(): void {
    this.$user()?.addGame(this.gameCard);
    console.log(this.$user()?.favorites());

  }
}
