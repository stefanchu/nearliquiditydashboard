import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript interfaces
export interface LiquiditySnapshot {
  id: number
  timestamp: string
  exchange: string
  pair: string
  mid_price: number
  spread_bps: number
  bid_10bps: number
  ask_10bps: number
  total_10bps: number
  bid_25bps: number
  ask_25bps: number
  total_25bps: number
  bid_50bps: number
  ask_50bps: number
  total_50bps: number
  bid_1pct: number
  ask_1pct: number
  total_1pct: number
  bid_2pct: number
  ask_2pct: number
  total_2pct: number
}

// Fetch latest snapshots
export async function getLatestSnapshots(limit: number = 100) {
  const { data, error } = await supabase
    .from('liquidity_snapshots')
    .select('*')
    .eq('exchange', 'binance')
    .order('timestamp', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching data:', error)
    return []
  }

  return (data || []).reverse() // Oldest to newest for charts
}

// Fetch latest single snapshot
export async function getLatestSnapshot() {
  const { data, error } = await supabase
    .from('liquidity_snapshots')
    .select('*')
    .eq('exchange', 'binance')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching latest:', error)
    return null
  }

  return data
}
