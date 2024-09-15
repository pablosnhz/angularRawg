import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Genre } from 'src/app/core/models/genres';
import { GenresPageComponent } from 'src/app/routes/games-page/pages/genres-page/genres-page.component';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ RouterOutlet, CommonModule, GenresPageComponent ],
})
export class GenresListComponent {

  @Input({ required: true }) genresList: Genre[] = [];
}
