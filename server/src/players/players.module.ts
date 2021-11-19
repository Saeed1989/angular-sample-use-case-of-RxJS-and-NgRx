import { Module } from '@nestjs/common';

import { PlayerController } from './player.controller';
import { PlayerService } from './players.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayersModule {}
