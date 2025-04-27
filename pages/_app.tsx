import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// Validate and parse CHAIN_ID environment variable
const chainIdEnv = process.env.CHAIN_ID || "80002";
if (!chainIdEnv) {
  throw new Error("Missing environment variable: CHAIN_ID");
}
const chainId = parseInt(chainIdEnv, 10);
if (isNaN(chainId)) {
    throw new Error("Invalid environment variable: CHAIN_ID must be a number.");
}

const RPC_URL = process.env.RPC_URL || "https://rpc-amoy.polygon.technology/";

// Define the Amoy testnet manually
const amoy = {
  id: chainId,
  chainId: chainId,
  chain: "Polygon",
  name: "Polygon Amoy Testnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  // NOTE: If you encounter RPC errors (like 'cannot read properties of undefined (reading 'error')'), 
  // try using a different public Amoy RPC endpoint. 
  // You can find alternatives on public RPC lists (e.g., Chainlist).
  rpc: [RPC_URL],
  rpcUrls: {
    default: {
      http: [RPC_URL],
    },
    public: {
        http: [RPC_URL],
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
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={amoy} // Use the manually defined chain object
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
