import { Injectable, Logger } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { NetworkScannerModel } from "src/dto/network-scanner.dto";
import { environment } from "src/dto/environment";
import { formatBalance, BN } from '@polkadot/util';
import { ApiPromise, WsProvider } from '@polkadot/api';


@Injectable()
export class BlocksScannerService{
    api: any;
    keypair = environment.keypair;
    private logger = new Logger('polkadot-blocks.controller');  // LOGGER INITIALIZING WITH CONTEXT

    public blockSubscription: any;
    private currentBalance: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private currentToken: BehaviorSubject<string> = new BehaviorSubject<any>('XON');
    private networkScanner: BehaviorSubject<NetworkScannerModel> = new BehaviorSubject<any>(NetworkScannerModel);
    private tokenMetrics: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    tokenMetrics$ = this.tokenMetrics.asObservable();

  async scannerBlocks() {
      console.log(`Connecting to database at ${environment.secret_key}`);
      return this.networkScanner.asObservable();
  }

    
  public async setTotalBlocks(params): Promise<NetworkScannerModel> {
    let network: NetworkScannerModel = new NetworkScannerModel();
    console.log(params)
    let api; // api initialization
    try {
      await this.connect(params);
      api = await this.api;
    } catch (error) {
      throw error;
    }

    // Get Total Wallet
    const totalWallet: any = await api.query.system.account.entries();
    network.total_wallets = totalWallet.length

    // Get Token Name
    const tokens = await api.registry.chainTokens;

    // network.token_name = tokens[0]
    let last_gas_fee =0; 
    let total_blocks = '';
    this.currentToken.next(tokens[0])
    await new Promise<void>((resolve) => {
      this.blockSubscription = api.derive.chain.subscribeNewHeads(async (lastHeader: any) => {
        const events: any = await api.query.system.events.at(lastHeader.hash);
        events.forEach(async ({ event }) => {
          // console.log(event)
            const properties = await api.rpc.system.properties();
            const data: any = properties.toHuman();
            const symbol = data.tokenSymbol[0];
            const decimal = data.tokenDecimals[0];
            formatBalance.setDefaults({ decimals: decimal, unit: symbol });
            formatBalance.getDefaults();
            const bal = formatBalance(
              event.data.actualFee,
              {
                forceUnit: symbol,
                withUnit: false
              }
            );
            const balances = parseFloat(bal).toFixed(6);
            const fee_format = `${balances}`;
            
            network.last_gas_fee = parseFloat(fee_format) == 0.000000 ? 0.00212 : parseFloat(fee_format);
            last_gas_fee = network.last_gas_fee
            
          });
          total_blocks = (lastHeader.number).toString();
          console.log(`Last gas fee ${last_gas_fee}`)
          network.last_gas_fee = last_gas_fee;
          network.total_blocks = total_blocks;
          resolve();
      });
    });

    return network
  }

  async connect(params){
    const provider = new WsProvider(params.network[0].wsProviderEndpoint)
    this.api = ApiPromise.create({ provider });
  }
}