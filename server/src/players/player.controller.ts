import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { PlayerService } from './players.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playersService: PlayerService) {}

  @Post()
  addPlayer(
    @Body('playerName') playerName: string,
    @Body('jerseyNumber') jerseyNumber: string,
    @Body('description') description: string,
    @Body('starRating') starRating: string,
  ) {
    console.log(playerName);
    return this.playersService.insertPlayer({
      id: null,
      playerName: playerName || null,
      jerseyNumber: jerseyNumber || null,
      description: description || null,
      starRating: starRating || null,
    });
  }

  @Get()
  getAllPlayers() {
    return this.playersService.getPlayers();
  }

  @Get(':id')
  getPlayer(@Param('id') prodId: string) {
    return this.playersService.getSinglePlayer(prodId);
  }

  @Patch(':id')
  updatePlayer(
    @Param('id') id: string,
    @Body('playerName') playerName: string,
    @Body('jerseyNumber') jerseyNumber: string,
    @Body('description') description: string,
    @Body('starRating') starRating: string,
  ) {
    return this.playersService.updatePlayer({
      id: id,
      playerName: playerName || null,
      jerseyNumber: jerseyNumber || null,
      description: description || null,
      starRating: starRating || null,
    });
  }

  @Delete(':id')
  removePlayer(@Param('id') prodId: string) {
    return this.playersService.deletePlayer(prodId);
  }
}
