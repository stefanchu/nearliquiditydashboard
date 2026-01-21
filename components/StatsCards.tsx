import { DollarSign, TrendingUp, Activity, BarChart3 } from 'lucide-react'
import { LiquiditySnapshot } from '@/lib/supabase'

interface StatsCardsProps {
  snapshot: LiquiditySnapshot | null
}

export default function StatsCards({ snapshot }: StatsCardsProps) {
  if (!snapshot) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const stats = [
    {
      label: 'Mid Price',
      value: `$${snapshot.mid_price.toFixed(4)}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'Spread',
      value: `${snapshot.spread_bps.toFixed(2)} bps`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      label: '50bps Depth',
      value: `$${(snapshot.total_50bps / 1000).toFixed(0)}k`,
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      label: '2% Depth',
      value: `$${(snapshot.total_2pct / 1000).toFixed(0)}k`,
      icon: BarChart3,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
