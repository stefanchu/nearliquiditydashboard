'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestPage() {
  const [status, setStatus] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testConnection()
  }, [])

  async function testConnection() {
    const results: any = {}
    
    // 1. Check environment variables
    results.envVars = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
      urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
    }
    
    // 2. Test Supabase connection
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      
      // Test query
      const { data, error, count } = await supabase
        .from('liquidity_snapshots')
        .select('*', { count: 'exact' })
        .limit(5)
      
      results.query = {
        success: !error,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null,
        dataCount: data?.length || 0,
        totalCount: count,
        sampleData: data?.[0] || null
      }
      
    } catch (err: any) {
      results.query = {
        success: false,
        error: err.message
      }
    }
    
    setStatus(results)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Testing Supabase Connection...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Supabase Connection Test</h1>
        
        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">1. Environment Variables</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_URL:</span>
              <span className={status.envVars.url.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {status.envVars.url}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
              <span className={status.envVars.key.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {status.envVars.key}
              </span>
            </div>
            {status.envVars.urlValue && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p className="text-xs font-mono break-all">URL: {status.envVars.urlValue}</p>
                <p className="text-xs font-mono break-all">Key: {status.envVars.keyPrefix}</p>
              </div>
            )}
          </div>
        </div>

        {/* Query Results */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">2. Database Query</h2>
          
          {status.query.success ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <span className="text-2xl">✅</span>
                <span className="font-bold">Connection Successful!</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded">
                  <p className="text-sm text-gray-600">Records Retrieved</p>
                  <p className="text-3xl font-bold text-green-700">{status.query.dataCount}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-600">Total in Database</p>
                  <p className="text-3xl font-bold text-blue-700">{status.query.totalCount || 'Unknown'}</p>
                </div>
              </div>
              
              {status.query.sampleData && (
                <div>
                  <h3 className="font-bold mb-2">Sample Record:</h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                    {JSON.stringify(status.query.sampleData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">❌</span>
                <span className="font-bold">Query Failed</span>
              </div>
              
              {status.query.error && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <pre className="text-sm text-red-800 whitespace-pre-wrap">
                    {JSON.stringify(status.query.error, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Full Debug Output</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
            {JSON.stringify(status, null, 2)}
          </pre>
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              setLoading(true)
              testConnection()
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            🔄 Run Test Again
          </button>
        </div>
      </div>
    </div>
  )
}
