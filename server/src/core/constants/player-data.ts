/**
 * This is the store for dummy data
 */

import { Player } from '../models/player.model';

export class PlayerData {
  public static players: Player[] = [
    {
      id: '1',
      playerName: 'Sakib Hasan',
      jerseyNumber: '10',
      description: 'Number one alrounder',
      starRating: '8.2',
    },
    {
      id: '2',
      playerName: 'Tamim Iqbal',
      jerseyNumber: '7',
      description: 'Opener bats man',
      starRating: '7.5',
    },
    {
      id: '5',
      playerName: 'Mustafizur Rahman',
      jerseyNumber: '6',
      description: 'He is the currer master',
      starRating: '8.1',
    },
    {
      id: '8',
      playerName: 'Musfiqur Rahim',
      jerseyNumber: '12',
      description: 'Wicket Keeper batsman',
      starRating: '7.1',
    },
    {
      id: '10',
      playerName: 'Mahmudullah Riad',
      jerseyNumber: '19',
      description: 'He is konwn as Mr. Finisher',
      starRating: '7.0',
    },
  ];
}
