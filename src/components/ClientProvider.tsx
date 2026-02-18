'use client';

import { FogoSessionProvider, Network } from '@fogo/sessions-sdk-react';
import { NATIVE_MINT } from '@solana/spl-token';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <FogoSessionProvider
      network={Network.Testnet}
      tokens={[NATIVE_MINT.toBase58()]}
      defaultRequestedLimits={{ [NATIVE_MINT.toBase58()]: 10000000000n }}
      enableUnlimited
    >
      {children}
    </FogoSessionProvider>
  );
}
