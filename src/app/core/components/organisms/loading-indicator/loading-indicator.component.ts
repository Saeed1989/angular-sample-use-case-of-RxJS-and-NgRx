import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { getCurrentLoading } from 'src/app/state/loading.reducer';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
})
export class LoadingIndicatorComponent implements OnInit {
  isLoading$: Observable<boolean>;
  
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(getCurrentLoading);
  }
}
