import type { AppProps } from "next/app";
import { FogoSessionProvider, Network } from "@fogo/sessions-sdk-react";
import { NATIVE_MINT } from "@solana/spl-token";
import "../globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FogoSessionProvider
      network={Network.Testnet}
      tokens={[NATIVE_MINT.toBase58()]}
      defaultRequestedLimits={{ [NATIVE_MINT.toBase58()]: 10000000000n }}
      enableUnlimited
    >
      <Component {...pageProps} />
    </FogoSessionProvider>
  );
}
