import { MainLayoutComponent } from "./core/main-layout/main-layout.component";
import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/games-page/pages/home-page/home-page.component';
import { GenresPageComponent } from "./routes/games-page/pages/genres-page/genres-page.component";
import { GenresListComponent } from "./shared/genres-list/genres-list.component";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'genres',
        component: GenresPageComponent,
        // component: GenresListComponent
      },
      {
        path: 'games',
        loadChildren: () => import('./routes/games-pages.module').then(m => m.gamePagesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
