import type { Metadata } from 'next';
import { FogoSessionProvider, Network } from '@fogo/sessions-sdk-react';
import { NATIVE_MINT } from '@solana/spl-token';
import './globals.css';

export const metadata: Metadata = {
  title: 'FogoUpDown - BTC Prediction on Fogo',
  description: 'Predict Bitcoin price movements with Fogo Sessions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FogoSessionProvider
          network={Network.Testnet}
          tokens={[NATIVE_MINT.toBase58()]}
          defaultRequestedLimits={{ [NATIVE_MINT.toBase58()]: 10000000000n }}
          enableUnlimited
        >
          {children}
        </FogoSessionProvider>
      </body>
    </html>
  );
}
