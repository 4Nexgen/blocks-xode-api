import { Test, TestingModule } from '@nestjs/testing';
import { PolkadotBlocksController } from './polkadot-blocks.controller';

describe('PolkadotBlocksController', () => {
  let controller: PolkadotBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolkadotBlocksController],
    }).compile();

    controller = module.get<PolkadotBlocksController>(PolkadotBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
