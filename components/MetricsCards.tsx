import { LiquiditySnapshot } from '@/lib/supabase'

export default function MetricsCards({ latest }: { latest: LiquiditySnapshot }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Current Mid Price</p>
        <p className="text-3xl font-bold text-blue-600">${latest.mid_price.toFixed(4)}</p>
        <p className="text-xs text-gray-500 mt-1">{latest.pair}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Spread</p>
        <p className="text-3xl font-bold text-green-600">{latest.spread_bps.toFixed(2)} bps</p>
        <p className="text-xs text-gray-500 mt-1">Bid-Ask Spread</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Bid Volume</p>
        <p className="text-3xl font-bold text-purple-600">{latest.bid_volume.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-1">NEAR tokens</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-sm text-gray-600 mb-2">Ask Volume</p>
        <p className="text-3xl font-bold text-orange-600">{latest.ask_volume.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-1">NEAR tokens</p>
      </div>
    </div>
  )
}
