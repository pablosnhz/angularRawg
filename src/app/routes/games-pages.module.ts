import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoDestroyService } from '../core/utils/auto-destroy.service';
import { GameDetailComponent } from './games-page/pages/game-detail/game-detail.component';
import { GamesPageComponent } from './games-page/pages/games-page/games-page.component';
import { GameIdResolver } from '../core/resolvers/game-id.resolver';
import { GameListComponent } from '../shared/game-list/game-list.component';
import { RecentlyPagesPageComponent } from './games-page/pages/recently-pages-page/recently-pages-page.component';

const routes: Routes = [
  {
    path: '',
    component: GamesPageComponent
  },
  {
    path: 'recently',
    component: RecentlyPagesPageComponent
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: ':id',
    resolve: {
      game: GameIdResolver
    },
    component: GameDetailComponent
  },

]

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
  ],
  providers: [AutoDestroyService, GameIdResolver],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class gamePagesModule { }
