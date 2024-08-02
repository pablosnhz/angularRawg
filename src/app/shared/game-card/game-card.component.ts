import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./game-card.component.scss'],
  standalone: true,
  imports: [ RouterModule, CommonModule, RouterLink ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GameCardComponent {
  @Input({ required: true }) gameCard: Game;
}
