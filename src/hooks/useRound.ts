'use client';

import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

interface Round {
  id: number;
  startTime: number;
  endTime: number;
  startPrice: number;
  endPrice: number | null;
  totalUp: number;
  totalDown: number;
  settled: boolean;
  winner: boolean | null;
}

export function useRound() {
  const [activeRound, setActiveRound] = useState<Round | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const fetchRound = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/rounds/active`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setActiveRound(data.data);
      }
    } catch (err) {
      console.error('Fetch round error:', err);
    }
  }, []);

  useEffect(() => {
    fetchRound();
    const interval = setInterval(fetchRound, 5000);
    return () => clearInterval(interval);
  }, [fetchRound]);

  useEffect(() => {
    if (!activeRound) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const end = activeRound.endTime * 1000;
      const remaining = Math.max(0, end - now);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        fetchRound();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRound, fetchRound]);

  return { activeRound, timeRemaining, refetch: fetchRound };
}
