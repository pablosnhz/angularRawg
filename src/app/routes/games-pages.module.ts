import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameListComponent } from '../shared/game-list/game-list.component';
import { GameCardComponent } from '../shared/game-card/game-card.component';
import { AutoDestroyService } from '../core/utils/auto-destroy.service';
import { GameDetailComponent } from './games-page/pages/game-detail/game-detail.component';
import { GamesPageComponent } from './games-page/pages/games-page/games-page.component';
import { GameIdResolver } from '../core/resolvers/game-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: GamesPageComponent
  },
  {
    path: 'games/:id',
    resolve: {
      game: GameIdResolver
    },
    component: GameDetailComponent
  }
]

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes)

  ],
  exports: [],
  declarations: [GamesPageComponent, GameListComponent, GameCardComponent, GameDetailComponent],
  providers: [AutoDestroyService],
})
export class gamePagesModule { }
