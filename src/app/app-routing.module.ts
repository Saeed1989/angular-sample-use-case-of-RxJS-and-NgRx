import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/organisms/no-page/page-not-found.component';
import { ShellComponent } from './core/components/pages/shell/shell.component';
import { SelfUrl } from './core/constants/url.constant';
import { AuthGuard } from './core/services/auth-guard.service';

const appRoutes: Routes = [
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
  { path: '', redirectTo: SelfUrl.HOME, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
