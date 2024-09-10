import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PolkadotBlocksController } from './polkadot-blocks/polkadot-blocks.controller';
import { BlocksScannerService } from './services/polkadot.service';

@Module({
  imports: [],
  controllers: [AppController, PolkadotBlocksController],
  providers: [AppService, BlocksScannerService],
})
export class AppModule {}
