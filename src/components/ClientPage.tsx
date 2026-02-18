'use client';

import { SessionButton } from '@fogo/sessions-sdk-react';
import { usePrice } from '@/hooks/usePrice';
import { useRound } from '@/hooks/useRound';
import { PriceChart } from '@/components/PriceChart';
import { BetPanel } from '@/components/BetPanel';
import { formatPrice } from '@/lib/utils';

export function ClientPage() {
  const { price, history, isConnected: priceConnected } = usePrice();
  const { activeRound, timeRemaining } = useRound();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-xl">
              🪙
            </div>
            <h1 className="text-xl font-bold">FogoUpDown</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-gray-400">BTC Price</div>
              <div className={`font-semibold ${price > (activeRound?.startPrice || 0) ? 'text-up' : 'text-down'}`}>
                {formatPrice(price)}
              </div>
            </div>
            <SessionButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Bitcoin Up or Down</h2>
                  <p className="text-sm text-gray-400">
                    Round #{activeRound?.id || '--'} • Pyth Oracle
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold">
                    {formatPrice(activeRound?.startPrice || 0)}
                  </div>
                  <div className="text-sm text-gray-400">Start Price</div>
                </div>
              </div>

              <PriceChart data={history} currentPrice={price} />

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${priceConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  {priceConnected ? 'Live' : 'Connecting...'}
                </span>
                <span>•</span>
                <span>Pyth Network</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Status', value: activeRound ? 'Active' : 'Loading', color: 'text-green-500' },
                { label: '24h High', value: formatPrice(price * 1.02) },
                { label: '24h Low', value: formatPrice(price * 0.98) },
                { label: 'Active Round', value: `#${activeRound?.id || '--'}` }
              ].map((stat, i) => (
                <div key={i} className="bg-surface rounded-xl border border-border p-4">
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className={`text-lg font-semibold ${stat.color || ''}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bet Panel */}
          <div>
            <BetPanel 
              round={activeRound} 
              timeRemaining={timeRemaining}
              currentPrice={price}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          Built on <span className="text-primary">Fogo Chain</span> with{' '}
          <span className="text-primary">Fogo Sessions</span> • Testnet
        </div>
      </footer>
    </div>
  );
}
