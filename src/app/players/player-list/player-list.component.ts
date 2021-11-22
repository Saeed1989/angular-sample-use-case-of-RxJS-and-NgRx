import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Player } from '../../core/modles/player.model';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {
  pageTitle = 'Players';

  @Input() errorMessage: string;
  @Input() players: Player[];
  @Input() displayCode: boolean;
  @Input() selectedPlayer: Player;
  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initializeNewPlayer = new EventEmitter<void>();
  @Output() playerWasSelected = new EventEmitter<Player>();

  checkChanged(): void {
    this.displayCodeChanged.emit();
  }

  newPlayer(): void {
    this.initializeNewPlayer.emit();
  }

  playerSelected(player: Player): void {
    this.playerWasSelected.emit(player);
  }
}
