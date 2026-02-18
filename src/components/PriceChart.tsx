'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  data: { price: number; timestamp: number }[];
  currentPrice: number;
}

export function PriceChart({ data, currentPrice }: Props) {
  const chartData = data.map(d => ({
    ...d,
    time: new Date(d.timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="time" 
            stroke="#8b949e" 
            fontSize={10}
            tickLine={false}
          />
          <YAxis 
            stroke="#8b949e"
            fontSize={10}
            tickLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#8b949e' }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
