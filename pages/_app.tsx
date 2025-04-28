import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { logger } from "../utils/logger";
import ErrorBoundary from "../src/components/ErrorBoundary";
import React from "react";
import { PolygonAmoyTestnet } from "../const/nets";

function MyApp({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ThirdwebProvider
      activeChain={PolygonAmoyTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThirdwebProvider>
  );
}

export default MyApp;
