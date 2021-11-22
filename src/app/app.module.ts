import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/components/organisms/menu/menu.component';
import { PageNotFoundComponent } from './core/components/organisms/no-page/page-not-found.component';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ShellComponent } from './core/components/pages/shell/shell.component';
import { HomeModule } from './home/home.module';
import { SetRootUrlInterceptor } from './core/services/set-root-url.interceptor';
import { LoadingIndicatorComponent } from './core/components/organisms/loading-indicator/loading-indicator.component';
import { loadingReducer } from './state/loading.reducer';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Angular-NgRx-RxJS-Demo',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('loading', loadingReducer),
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SetRootUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
