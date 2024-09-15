import { ChangeDetectionStrategy, Component, computed, Input, Signal } from '@angular/core';
import { Genre } from 'src/app/core/models/genres';
import { FavoritesService } from '../../services/favorites.service';
import { GenresPageComponent } from '../genres-page/genres-page.component';
import { GenreService } from '../../services/genre.service';

@Component({
  selector: 'app-favorites-genres',
  templateUrl: './favorites-genres.component.html',
  styleUrls: ['./favorites-genres.component.scss'],
  standalone: true,
  imports: [GenresPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesGenresComponent {

  // $genres: Signal<Genre[]> = this.genresService.$genres;
  // $genres: Signal<Genre[]> = computed(() => Array.from(this.favoritesService.$user().favoriteGenre().values() ?? []));

  constructor( private favoritesService: FavoritesService, private genresService: GenreService ){}

}
