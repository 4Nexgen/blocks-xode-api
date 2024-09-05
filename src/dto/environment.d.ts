

export const environment = {
    
    keypair: localStorage.getItem("wallet-keypair") || "",
    WalletAPIURL: "https://wallet-api.xode.net",
    secret_key: "^a7T&kPzL#9s@4!gF%8H",
    networks: [
        {
            network: [
            {
                id: 1,
                name: 'Evolution',
                wsProviderEndpoint: 'wss://rpcnodea01.xode.net/n7yoxCmcIrCF6VziCcDmYTwL8R03a/rpc',
                net_name: 'Mainnet'
            }
            ]
        },
        {
            network: [
            {
                id: 2,
                name: 'Genesis',
                wsProviderEndpoint: 'wss://testrpcnodea01.xode.net/aRoyklGrhl9m2LlhX8NP/rpc',
                net_name: 'Testnet'
            }
            ]
        },
    ],
}