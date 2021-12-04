import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Alert } from '../core/modles/alert.model';
import { State } from '../state/app.state';
import { getCurrentUser } from '../user/state/user.reducer';
import { AlertPageActions } from './state/actions';
import { getAlerts } from './state/alert.selectors';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public pageTitle = 'Welcome';

  alerts$: Observable<Alert[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getCurrentUser).subscribe((user) => {
      this.store.dispatch(
        AlertPageActions.loadAlerts({ userId: (user.id || '').toString() })
      );
    });
    this.alerts$ = this.store.select(getAlerts);
  }
}
