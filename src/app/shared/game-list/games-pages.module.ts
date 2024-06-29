import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GamesPageComponent } from './pages/games-page/games-page.component';

const routes: Routes = [
  {
    path: '',
    component: GamesPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes)

  ],
  exports: [],
  declarations: [GamesPageComponent],
  providers: [],
})
export class gamePagesModule { }
