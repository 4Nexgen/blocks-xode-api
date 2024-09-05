import { Controller, Get, Req, Logger } from '@nestjs/common';
import { NetworkScannerModel } from 'src/dto/network-scanner.dto';
import { BlocksScannerService } from 'src/services/polkadot.service';

@Controller('polkadot-blocks')
export class PolkadotBlocksController {
    private logger = new Logger('polkadot-blocks.controller');  // LOGGER INITIALIZING WITH CONTEXT

    @Get()
    getNetworkScanner(@Req() request: Request):  Promise<any[]>{
        let _re = BlocksScannerService.toString()
        this.logger.verbose(`Verbose log ${_re}`)
        this.logger.log(`Verbose log ${_re}`)
        return Promise.resolve([_re]);
    }
}
