import { ChangeDetectionStrategy, Component, computed, Input, Signal } from '@angular/core';
import { take } from 'rxjs';
import { Genre } from 'src/app/core/models/game';
import { GenresResult } from 'src/app/core/models/genres';
import { User } from 'src/app/core/models/user';
import { FavoritesService } from '../../services/favorites.service';
import { GenreService } from '../../services/genre.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-main-genre',
  templateUrl: './main-genre.component.html',
  styleUrls: ['./main-genre.component.scss'],
  imports: [RouterOutlet, RouterLink, CommonModule, SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MainGenreComponent {
  @Input() genresCard: Genre;
  $genres: Signal<Genre[]> = this.genreService.$genres;
  $user: Signal<User | null> = this.favoritesService.$user;

  $favoriteGenres: Signal<boolean> = computed(() => {
    const user = this.favoritesService.$user();
    if (!this.genresCard || !user) {
      return false;
    }
    return user.favoriteGenre().has(this.genresCard.id);
  });

  constructor(private genreService: GenreService, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  followGenre(genre: Genre): void {
    this.$user()?.addGenre(genre);
  }

  getGenres(): void {
    this.genreService.getGenres().pipe(
      take(1))
      .subscribe((genres: GenresResult) => this.genreService.setGenres(genres.results));
  }
}

