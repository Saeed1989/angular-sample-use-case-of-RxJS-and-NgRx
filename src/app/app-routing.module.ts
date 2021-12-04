import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/organisms/no-page/page-not-found.component';
import { SelfUrl } from './core/constants/url.constant';
import { AuthGuard } from './core/services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: SelfUrl.HOME,
    pathMatch: 'full',
  },
  {
    path: SelfUrl.HOME,
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: SelfUrl.PLAYERS,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./players/player.module').then((m) => m.PlayerModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
