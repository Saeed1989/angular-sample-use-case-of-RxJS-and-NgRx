import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerData } from 'src/core/constants/player-data';
import { Player } from 'src/core/models/player.model';


@Injectable()
export class PlayerService {

  insertPlayer(player: Player) {
    const prodId = Math.random().toString();
    const newPlayer = { id: prodId, ...player };
    PlayerData.players.push(newPlayer);
    return prodId;
  }

  getPlayers() {
    return PlayerData.players;
  }

  getSinglePlayer(playerId: string) {
    const player = this.findPlayer(playerId)[0];
    return { ...player };
  }

  updatePlayer(updatedPlayer: Player) {
    const [player, index] = this.findPlayer(updatedPlayer.id);
    PlayerData.players[index] = { ...updatedPlayer };
  }

  deletePlayer(prodId: string) {
    const index = this.findPlayer(prodId)[1];
    PlayerData.players.splice(index, 1);
  }

  private findPlayer(id: string): [Player, number] {
    const playerIndex = PlayerData.players.findIndex(prod => prod.id === id);
    const player = PlayerData.players[playerIndex];
    if (!player) {
      throw new NotFoundException('Could not find player.');
    }
    return [player, playerIndex];
  }
}
