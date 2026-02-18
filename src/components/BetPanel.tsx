'use client';

import { useState, useEffect } from 'react';
import { formatPrice, formatTimeRemaining } from '@/lib/utils';

interface Props {
  round: any;
  timeRemaining: number;
  currentPrice: number;
}

export function BetPanel({ round, timeRemaining, currentPrice }: Props) {
  const [sessionState, setSessionState] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    import('@fogo/sessions-sdk-react').then(mod => {
      // Hook cannot be called dynamically, use state instead
    });
  }, []);
  
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const placeBet = async () => {
    if (!direction || !round) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rounds/${round.id}/bet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction, amount })
      });
      
      if (res.ok) {
        alert(`Bet placed: ${amount} FOGO on ${direction.toUpperCase()}`);
      }
    } catch (e) {
      console.error('Bet failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!round) {
    return (
      <div className="bg-surface rounded-xl border border-border p-6 text-center">
        <p className="text-gray-400">No active round</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Place Bet</h3>
        <button className="px-4 py-2 bg-primary rounded-lg">Connect Wallet</button>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-400 mb-2">Round #{round.id}</div>
        <div className="text-3xl font-mono font-bold">
          {formatTimeRemaining(timeRemaining)}
        </div>
        <div className="text-sm text-gray-400">remaining</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setDirection('up')}
          className={`p-4 rounded-xl border-2 transition-all ${
            direction === 'up'
              ? 'bg-up/10 border-up'
              : 'border-border hover:border-up/50'
          }`}
        >
          <div className="text-up font-bold text-xl">📈 UP</div>
          <div className="text-sm text-gray-400">{round.totalUp} FOGO</div>
        </button>

        <button
          onClick={() => setDirection('down')}
          className={`p-4 rounded-xl border-2 transition-all ${
            direction === 'down'
              ? 'bg-down/10 border-down'
              : 'border-border hover:border-down/50'
          }`}
        >
          <div className="text-down font-bold text-xl">📉 DOWN</div>
          <div className="text-sm text-gray-400">{round.totalDown} FOGO</div>
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Amount (FOGO)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-white"
          min="0.1"
          step="0.1"
        />
      </div>

      <button
        onClick={placeBet}
        disabled={!direction || isLoading}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          !direction
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : direction === 'up'
            ? 'bg-up hover:bg-up/90'
            : 'bg-down hover:bg-down/90'
        }`}
      >
        {isLoading ? 'Processing...' :
         !direction ? 'Select Direction' :
         `Bet ${amount} FOGO on ${direction.toUpperCase()}`}
      </button>
    </div>
  );
}
