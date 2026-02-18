'use client';

import { useState, useEffect, useCallback } from 'react';

const WS_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('http', 'ws') || 'ws://localhost:3002';

interface PriceHistory {
  price: number;
  timestamp: number;
}

export function usePrice() {
  const [price, setPrice] = useState(0);
  const [history, setHistory] = useState<PriceHistory[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws`);

    ws.onopen = () => {
      console.log('Price WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'price' && data.data) {
          const newPrice = data.data.price;
          setPrice(newPrice);
          setHistory(prev => {
            const updated = [...prev, { price: newPrice, timestamp: data.data.timestamp }];
            return updated.slice(-60); // Keep last 60 points
          });
        }
      } catch (err) {
        console.error('WebSocket message error:', err);
      }
    };

    ws.onclose = () => {
      console.log('Price WebSocket disconnected');
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { price, history, isConnected };
}
