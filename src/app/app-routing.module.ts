import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/organisms/no-page/page-not-found.component';
import { ShellComponent } from './core/components/pages/shell/shell.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'players',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./players/player.module').then((m) => m.PlayerModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
