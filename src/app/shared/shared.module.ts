import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/organisms/menu/menu.component';
import { PageNotFoundComponent } from './components/organisms/no-page/page-not-found.component';
import { LoadingIndicatorComponent } from './components/organisms/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuComponent,
    PageNotFoundComponent,
    LoadingIndicatorComponent,
  ],
})
export class SharedModule {}
