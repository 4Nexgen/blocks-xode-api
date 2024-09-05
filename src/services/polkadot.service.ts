import { Inject } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
import { NetworkScannerModel } from "src/dto/network-scanner.dto";
import { environment } from "src/dto/environment";


export class BlocksScannerService{
    constructor(
        // @Inject('SECRET_KEY') private secret: string,
        // @Inject('KEYPAIR') private KEYPAIR: string
    ) {}


    api: any;
    keypair = environment.keypair;


    private networkScanner: BehaviorSubject<NetworkScannerModel> = new BehaviorSubject<NetworkScannerModel>(new NetworkScannerModel());
    async scannerBlocks() {
        console.log(`Connecting to database at ${environment.secret_key}`);


        return this.networkScanner.asObservable();
    }

    
//   public async setTotalBlocks(): Promise<void> {
//     let network: NetworkScannerModel = new NetworkScannerModel();
    
//     const api = await this.api;

//     // Get Total Wallet
//     const totalWallet: any = await api.query.system.account.entries();
//     network.total_wallets = totalWallet.length

//     // Get Net Name
//     network.net_name = this.cookiesService.getCookieArray('network')!=undefined? this.cookiesService.getCookieArray('network').net_name  : environment.networks[0].network[0].net_name

//     // Get Token Name
//     const tokens = await api.registry.chainTokens;
//     network.token_name = tokens[0]
//     this.currentToken.next(tokens[0])

//     this.blockSubscription = api.derive.chain.subscribeNewHeads(async (lastHeader: any) => {
//       const events: any = await api.query.system.events.at(lastHeader.hash);
//       events.forEach(async ({ event }) => {
       
//           const properties = await api.rpc.system.properties();
//           const data: any = properties.toHuman();
//           const symbol = data.tokenSymbol[0];
//           const decimal = data.tokenDecimals[0];
//           formatBalance.setDefaults({ decimals: decimal, unit: symbol });
//           formatBalance.getDefaults();
//           const bal = formatBalance(
//             event.data.actualFee,
//             {
//               forceUnit: symbol,
//               withUnit: false
//             }
//           );
//           const balances = parseFloat(bal).toFixed(6);
//           const fee_format = `${balances}`;
//           network.last_gas_fee = parseFloat(fee_format) == 0.000000 ? 0.00212 : parseFloat(fee_format);
//       });
  
//       network.total_blocks = lastHeader.number.toNumber();
//       this.networkScanner.next(network)
//     });
//   }


}