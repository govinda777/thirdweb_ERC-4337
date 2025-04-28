import { ThirdwebProvider } from "@thirdweb-dev/react";

export const amoyChain = {
  id: 80002,
  chainId: 80002,
  chain: "Polygon",
  name: "Polygon Amoy Testnet",
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
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan Amoy",
      url: "https://www.oklink.com/amoy",
    },
  },
  shortName: "amoy",
  slug: "polygon-amoy",
  testnet: true,
  thirdwebRpcConfig: {
    skipFetchSetup: true
  }
};

