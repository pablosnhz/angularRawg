import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, RouteReuseStrategy, RouterModule, withComponentInputBinding } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AutoDestroyService } from './core/utils/auto-destroy.service';
import { FormsModule } from '@angular/forms';
import { GenreDatesComponent } from './routes/games-page/pages/genre-dates/genre-dates.component';
import { RouteReuseStrategyChange } from './core/models/route-reuse-strategy';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AutoDestroyService,
    [provideRouter([
      { component: GenreDatesComponent, path: 'test'},
    ],
    withComponentInputBinding())],
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseStrategyChange
    },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
