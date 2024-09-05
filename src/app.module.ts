import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolkadotBlocksController } from './polkadot-blocks/polkadot-blocks.controller';

@Module({
  imports: [],
  controllers: [AppController, PolkadotBlocksController],
  providers: [AppService],
})
export class AppModule {}
