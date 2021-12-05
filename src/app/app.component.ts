import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoadingIndicatorComponent } from './shared/components/organisms/loading-indicator/loading-indicator.component';
import { State } from './state/app.state';
import { getCurrentLoading } from './state/loading.reducer';
import { getCurrentUser } from './user/state/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  showMenu = false;
  // Wires up BlockUI instance
  @BlockUI() blockUI: NgBlockUI;
  blockTemplate: LoadingIndicatorComponent;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.blockUI.stop();
    this.store.select(getCurrentLoading).subscribe((val) => {
      if (val) {
        this.blockUI.start();
      } else {
        this.blockUI.stop();
      }
    });

    this.store.select(getCurrentUser).subscribe((currUser) => {
      this.showMenu = !!currUser;
    });
  }
}
