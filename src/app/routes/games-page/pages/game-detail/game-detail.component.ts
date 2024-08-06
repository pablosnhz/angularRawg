import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from 'src/app/core/models/game-details';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class GameDetailComponent implements OnInit{
gameDetails: GameDetails;
isExpanded: boolean = false;
constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.gameDetails = this.route.snapshot.data['game'] as GameDetails;
    // console.log(this.gameDetails);
  }

  toggleText() {
    this.isExpanded = !this.isExpanded;
  }
}
