import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from 'src/app/core/models/game';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { take } from 'rxjs';
import { GenresResult } from 'src/app/core/models/genres';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, CommonModule, SpinnerComponent]
})
export class GenresPageComponent implements OnInit {
  ngOnInit(): void {
    this.getGenres();
  }

  $genres: Signal<Genre[]> = this.genreService.$genres;

  constructor(private genreService: GenreService) { }

  getGenres(): void {
    this.genreService.getGenres().pipe(
      take(1))
      .subscribe((genres: GenresResult) => this.genreService.setGenres(genres.results));
  }
}
