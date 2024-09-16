import { ChangeDetectionStrategy, Component, Input, OnInit, Signal } from '@angular/core';
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
export class GenresPageComponent implements OnInit {

  @Input() genresCard: Genre;
  $genres: Signal<Genre[]> = this.genreService.$genres;
  $user: Signal<User | null> = this.favoritesService.$user;

  constructor(private genreService: GenreService, private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  followGenre(genre: Genre): void {
    // console.log('Followed genre:', genre.name);
    this.$user()?.addGenre(genre);
    // this.favoritesService.addGenreToFavorites(genre);
  }

  getGenres(): void {
    this.genreService.getGenres().pipe(
      take(1))
      .subscribe((genres: GenresResult) => this.genreService.setGenres(genres.results));
  }
}
