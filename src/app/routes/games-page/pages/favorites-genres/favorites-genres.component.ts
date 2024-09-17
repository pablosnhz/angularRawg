import { ChangeDetectionStrategy, Component, computed, Input, Signal } from '@angular/core';
import { Genre } from 'src/app/core/models/genres';
import { FavoritesService } from '../../services/favorites.service';
import { GenresPageComponent } from '../genres-page/genres-page.component';
import { GenreService } from '../../services/genre.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites-genres',
  templateUrl: './favorites-genres.component.html',
  styleUrls: ['./favorites-genres.component.scss'],
  standalone: true,
  imports: [GenresPageComponent, CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesGenresComponent {

  $favoriteGenres: Signal<Genre[]> = computed(() => Array.from(this.favoritesService.$user().favoriteGenre().values() ?? []));

  // $favoriteGenresList: Signal<Genre[]> = computed(() => {
  //   return this.$favoriteGenres().map(genre => {
  //     return this.genresService.$genres().filter(genreList => genreList.id === genre.id)[0];
  //   });
  // });

  constructor( private favoritesService: FavoritesService, private genresService: GenreService ){}

}
