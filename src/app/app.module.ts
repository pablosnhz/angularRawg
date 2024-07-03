import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TopBarComponent } from './core/main-layout/top-bar/top-bar.component';
import { AutoDestroyService } from './core/utils/auto-destroy.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,

    MainLayoutComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AutoDestroyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
