import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { ShellComponent } from './shell/shell.component';
import { HomeModule } from './home/home.module';
import { SetRootUrlInterceptor } from './core/services/set-root-url.interceptor';
import { loadingReducer } from './state/loading.reducer';
import { AddHeaderInterceptor } from './core/services/add-header.interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Angular-NgRx-RxJS-Demo',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    BlockUIModule.forRoot(),
    StoreModule.forFeature('loading', loadingReducer),
  ],
  declarations: [AppComponent, ShellComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetRootUrlInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
