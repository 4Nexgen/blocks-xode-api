// polkadot-blocksScannerService.controller.ts
import { Controller, Get, Req, Logger } from '@nestjs/common';
import { ApiPromise, WsProvider  } from '@polkadot/api';
import { environment } from 'src/dto/environment';
import { NetworkScannerModel } from 'src/dto/network-scanner.dto';
import { BlocksScannerService } from 'src/services/polkadot.service';

@Controller('polkadot-blocks')
export class PolkadotBlocksController {
    private logger = new Logger('polkadot-blocks.controller');  // LOGGER INITIALIZING WITH CONTEXT
    constructor(private blocksScannerService: BlocksScannerService) {}
    @Get()
    async getNetworkScanner(@Req() request: Request):  Promise<any[]>{

        const wsProvider_local = environment.networks[0];
        const network = wsProvider_local.network[0].wsProviderEndpoint;
        console.log(network)

        
        // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
        const wsProvider = new WsProvider(network);
        const api = await ApiPromise.create({ provider: wsProvider });
        console.log(api.genesisHash.toHex());
        this.blocksScannerService.setTotalBlocks(network)
        return Promise.resolve([api.genesisHash.toHex()]);
    }
}
