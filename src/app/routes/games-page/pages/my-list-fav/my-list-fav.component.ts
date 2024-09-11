import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-list-fav',
  templateUrl: './my-list-fav.component.html',
  styleUrls: ['./my-list-fav.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyListFavComponent {
}
