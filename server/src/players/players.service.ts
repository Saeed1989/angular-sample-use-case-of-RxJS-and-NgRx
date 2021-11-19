import { Injectable, NotFoundException } from '@nestjs/common';

import { Player } from './player.model';

@Injectable()
export class PlayerService {
  private players: Player[] = [];

  insertPlayer(player: Player) {
    const prodId = Math.random().toString();
    const newPlayer = { id: prodId, ...player };
    this.players.push(newPlayer);
    return prodId;
  }

  getPlayers() {
    console.log(this.players);
    return [...this.players];
  }

  getSinglePlayer(playerId: string) {
    const player = this.findPlayer(playerId)[0];
    return { ...player };
  }

  updatePlayer(updatedPlayer: Player) {
    const [player, index] = this.findPlayer(updatedPlayer.id);
    this.players[index] = { ...updatedPlayer };
  }

  deletePlayer(prodId: string) {
    const index = this.findPlayer(prodId)[1];
    this.players.splice(index, 1);
  }

  private findPlayer(id: string): [Player, number] {
    const playerIndex = this.players.findIndex(prod => prod.id === id);
    const player = this.players[playerIndex];
    if (!player) {
      throw new NotFoundException('Could not find player.');
    }
    return [player, playerIndex];
  }
}
