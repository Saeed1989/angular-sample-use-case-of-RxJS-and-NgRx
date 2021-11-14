import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { PlayerData } from './players/services/player-data';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './core/components/organisms/menu/menu.component';
import { PageNotFoundComponent } from './core/components/organisms/no-page/page-not-found.component';

/* Feature Modules */
import { UserModule } from './user/user.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ShellComponent } from './core/components/pages/shell/shell.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './home/alert/alert.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(PlayerData),
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    HomeComponent,
    AlertComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
