'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { LiquiditySnapshot } from '@/lib/supabase'

interface LiquidityChartProps {
  snapshots: LiquiditySnapshot[]
}

export default function LiquidityChart({ snapshots }: LiquidityChartProps) {
  // Transform data for chart
  const chartData = snapshots.map(snapshot => ({
    time: new Date(snapshot.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    fullTime: new Date(snapshot.timestamp).toLocaleString(),
    '10bps': (snapshot.total_10bps / 1000).toFixed(1),
    '25bps': (snapshot.total_25bps / 1000).toFixed(1),
    '50bps': (snapshot.total_50bps / 1000).toFixed(1),
    '1%': (snapshot.total_1pct / 1000).toFixed(1),
    '2%': (snapshot.total_2pct / 1000).toFixed(1)
  }))

  if (chartData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Binance Liquidity Depth Over Time</h2>
        <div className="h-96 flex items-center justify-center text-gray-500">
          No data available yet. Run your Python script to collect data.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Binance Liquidity Depth Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            label={{ 
              value: 'Liquidity (USD Thousands)', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: '#9CA3AF' }
            }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151', 
              borderRadius: '8px',
              color: '#fff'
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullTime
              }
              return label
            }}
            formatter={(value: any) => [`$${parseFloat(value).toFixed(1)}k`, '']}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Line 
            type="monotone" 
            dataKey="10bps" 
            stroke="#EF4444" 
            strokeWidth={2}
            dot={false}
            name="10 bps"
          />
          <Line 
            type="monotone" 
            dataKey="25bps" 
            stroke="#F59E0B" 
            strokeWidth={2}
            dot={false}
            name="25 bps"
          />
          <Line 
            type="monotone" 
            dataKey="50bps" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={false}
            name="50 bps"
          />
          <Line 
            type="monotone" 
            dataKey="1%" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            name="1%"
          />
          <Line 
            type="monotone" 
            dataKey="2%" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={false}
            name="2%"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
