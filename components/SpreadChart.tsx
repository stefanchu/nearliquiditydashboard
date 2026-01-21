'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LiquiditySnapshot } from '@/lib/supabase'

interface SpreadChartProps {
  snapshots: LiquiditySnapshot[]
}

export default function SpreadChart({ snapshots }: SpreadChartProps) {
  const chartData = snapshots.map(snapshot => ({
    time: new Date(snapshot.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    fullTime: new Date(snapshot.timestamp).toLocaleString(),
    spread: snapshot.spread_bps.toFixed(2)
  }))

  if (chartData.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Spread Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
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
              value: 'Spread (bps)', 
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
            formatter={(value: any) => [`${value} bps`, 'Spread']}
          />
          <Line 
            type="monotone" 
            dataKey="spread" 
            stroke="#06B6D4" 
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
