import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { AlertModule } from './alerts/alert.module';

@Module({
  imports: [PlayersModule, AlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
