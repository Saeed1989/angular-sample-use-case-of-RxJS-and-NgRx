import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Player } from '../../core/modles/player';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

/* NgRx */
import { Store } from '@ngrx/store';
import { State, getCurrentPlayer } from '../state';
import { PlayerPageActions } from '../state/actions';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
})
export class PlayerEditComponent implements OnInit {
  pageTitle = 'Player Edit';
  errorMessage = '';
  playerForm: FormGroup;

  player$: Observable<Player | null>;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      playerName: {
        required: 'Player name is required.',
        minlength: 'Player name must be at least three characters.',
        maxlength: 'Player name cannot exceed 50 characters.',
      },
      jerseyNumber: {
        required: 'Player code is required.',
      },
      starRating: {
        range: 'Rate the player between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.playerForm = this.fb.group({
      playerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      jerseyNumber: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
    });

    // Watch for changes to the currently selected player
    this.player$ = this.store
      .select(getCurrentPlayer)
      .pipe(tap((currentPlayer) => this.displayPlayer(currentPlayer)));

    // Watch for value changes for validation
    this.playerForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.playerForm
        ))
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.playerForm
    );
  }

  displayPlayer(player: Player | null): void {
    if (player) {
      // Reset the form back to pristine
      this.playerForm.reset();

      // Display the appropriate page title
      if (player.id === 0) {
        this.pageTitle = 'Add Player';
      } else {
        this.pageTitle = `Edit Player: ${player.playerName}`;
      }

      // Update the data on the form
      this.playerForm.patchValue({
        playerName: player.playerName,
        jerseyNumber: player.jerseyNumber,
        starRating: player.starRating,
        description: player.description,
      });
    }
  }

  cancelEdit(player: Player): void {
    // Redisplay the currently selected player
    // replacing any edits made
    this.displayPlayer(player);
  }

  deletePlayer(player: Player): void {
    if (player && player.id) {
      if (confirm(`Really delete the player: ${player.playerName}?`)) {
        this.store.dispatch(
          PlayerPageActions.deletePlayer({ playerId: player.id })
        );
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(PlayerPageActions.clearCurrentPlayer());
    }
  }

  savePlayer(originalPlayer: Player): void {
    if (this.playerForm.valid) {
      if (this.playerForm.dirty) {
        // Copy over all of the original player properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const player = { ...originalPlayer, ...this.playerForm.value };

        if (player.id === 0) {
          this.store.dispatch(PlayerPageActions.createPlayer({ player }));
        } else {
          this.store.dispatch(PlayerPageActions.updatePlayer({ player }));
        }
      }
    }
  }
}
