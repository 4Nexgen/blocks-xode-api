// polkadot-blocksScannerService.controller.ts
import { Controller, Get, Req, Logger, Param, NotFoundException } from '@nestjs/common';
import { ApiPromise, WsProvider  } from '@polkadot/api';
import { environment } from 'src/dto/environment';
import { NetworkScannerModel } from 'src/dto/network-scanner.dto';
import { BlocksScannerService } from 'src/services/polkadot.service';

@Controller('polkadot-blocks')
export class PolkadotBlocksController {
    private logger = new Logger('polkadot-blocks.controller');  // LOGGER INITIALIZING WITH CONTEXT
    constructor(private blocksScannerService: BlocksScannerService) {}
    
    @Get(':network')
    async getNetworkScanner(@Param('network') network_str: string, @Req() request: Request):  Promise<NetworkScannerModel>{
        try {

        // const wsProvider_local = environment.networks[0];
        const wsProvider_local = environment.networks.find((network) => network.network[0].net_name === network_str);
        if (!wsProvider_local) {
            throw new NotFoundException(`Network with ID ${network_str} not found`);
        }
        // const network = wsProvider_local.network[0].wsProviderEndpoint;
        // console.log(network)

        // Example test
        // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
        // const wsProvider = new WsProvider(network);
        // const api = await ApiPromise.create({ provider: wsProvider });
        // console.log(api.genesisHash.toHex());

        let network_model: NetworkScannerModel = new NetworkScannerModel();
        network_model = await this.blocksScannerService.setTotalBlocks(wsProvider_local)
        network_model.net_name = wsProvider_local.network[0].net_name;

        return network_model;
        }
        catch(error) {
            throw error;
        }
    }
}
