import { Injectable, Logger } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { NetworkScannerModel } from "src/dto/network-scanner.dto";
import { environment } from "src/dto/environment";
import { formatBalance, BN } from '@polkadot/util';
import { ApiPromise } from '@polkadot/api';


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

    
  public async setTotalBlocks(params): Promise<void> {
    let network: NetworkScannerModel = new NetworkScannerModel();
    
    console.log(`setTotalBlocks`)
    const api = await this.api; // api initialization
    console.log(`netwok total wallets ${api}`)

    // Get Total Wallet
    const totalWallet: any = await api.query.system.account.entries();
    network.total_wallets = totalWallet.length
    console.log(`netwok total wallets ${network.total_wallets}`)

    // Get Net Name
    network.net_name = params;
    console.log(`netwok total wallets ${network.net_name}`)

    // Get Token Name
    const tokens = await api.registry.chainTokens;
    console.log(`netwok total wallets ${tokens}`)

    // network.token_name = tokens[0]
    // this.currentToken.next(tokens[0])
    // this.blockSubscription = api.derive.chain.subscribeNewHeads(async (lastHeader: any) => {
    //   const events: any = await api.query.system.events.at(lastHeader.hash);
    //   events.forEach(async ({ event }) => {
    //     console.log(event)
    //       const properties = await api.rpc.system.properties();
    //       const data: any = properties.toHuman();
    //       const symbol = data.tokenSymbol[0];
    //       const decimal = data.tokenDecimals[0];
    //       formatBalance.setDefaults({ decimals: decimal, unit: symbol });
    //       formatBalance.getDefaults();
    //       const bal = formatBalance(
    //         event.data.actualFee,
    //         {
    //           forceUnit: symbol,
    //           withUnit: false
    //         }
    //       );
    //       const balances = parseFloat(bal).toFixed(6);
    //       const fee_format = `${balances}`;
    //       network.last_gas_fee = parseFloat(fee_format) == 0.000000 ? 0.00212 : parseFloat(fee_format);
    //   });
  
    //   network.total_blocks = lastHeader.number.toNumber();
    //   this.networkScanner.next(network)
    // });
  }

  async connect(){
    const provider = environment.networks[1].network[0].wsProviderEndpoint
    // this.contractAddress = this.cookiesService.getCookie('contract_address');
    this.api = ApiPromise.create({ provider });
  }

}