import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { logger } from "../utils/logger";
import ErrorBoundary from "../src/components/ErrorBoundary";
import React from "react";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    // Log da configuração da rede
    console.log("[DEBUG] Network Configuration:", {
      chainId: PolygonZkevmTestnet.chainId,
      chainName: PolygonZkevmTestnet.name,
      rpcUrls: PolygonZkevmTestnet.rpc,
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    });
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThirdwebProvider
      activeChain={PolygonZkevmTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: "https://api.defender.openzeppelin.com/actions/3d5fa97d-979d-437a-99cf-66fdc41884fc/runs/webhook/34a788c2-cb58-442b-8ff1-1c59e35af9be/UAtnNXoRE43pRFQJrsV7HE",
          },
        },
        bundlerUrl: `https://1442.bundler.thirdweb.com/v2/${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}`
      }}
    >
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThirdwebProvider>
  );
}

export default MyApp;
