import { ChangeDetectionStrategy, Component, computed, Input, OnInit, Signal } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from 'src/app/core/models/genres';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { take } from 'rxjs';
import { GenresResult } from 'src/app/core/models/genres';
import { FavoritesService } from '../../services/favorites.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, CommonModule, SpinnerComponent]
})
export class GenresPageComponent {

  @Input() genresCard: Genre;
  $genres: Signal<Genre[]> = this.genreService.$genres;
  $user: Signal<User | null> = this.favoritesService.$user

  $favoriteGenres: Signal<boolean> = computed(() => {
    const user = this.favoritesService.$user();
    if (!this.genresCard || !user) {
      return false;
    }
    return user.favoriteGenre().has(this.genresCard.id);
  });

  constructor(private genreService: GenreService, private favoritesService: FavoritesService) { }

  followGenre(genre: Genre): void {
    this.$user()?.addGenre(genre);
  }
}
