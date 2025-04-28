export const PolygonAmoyTestnet = {
    id: 80002,
    chainId: 80002,
    chain: "polygon-amoy",
    name: "Polygon Amoy Testnet",
    network: "polygon-amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpc: ["https://polygon-amoy-bor-rpc.publicnode.com"],
    rpcUrls: {
      default: {
        http: ["https://polygon-amoy-bor-rpc.publicnode.com"],
      },
      public: {
        http: ["https://polygon-amoy-bor-rpc.publicnode.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "PolygonScan Amoy",
        url: "https://www.oklink.com/amoy",
      },
    },
    testnet: true,
    shortName: "amoy",
    slug: "polygon-amoy",
    thirdwebRpcConfig: {
        skipFetchSetup: true
      }
  };