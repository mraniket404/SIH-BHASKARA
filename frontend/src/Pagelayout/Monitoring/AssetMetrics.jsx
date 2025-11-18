import React, { useState, useEffect } from 'react'

const AssetMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalAssets: 24,
    onlineAssets: 22,
    warningAssets: 2,
    criticalAssets: 0,
    avgUptime: 99.98,
    dataQuality: 99.2
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        avgUptime: 99.98 + (Math.random() - 0.5) * 0.02,
        dataQuality: 99.2 + (Math.random() - 0.5) * 0.1
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-white mb-1">{metrics.totalAssets}</div>
        <div className="text-xs text-gray-400">Total Assets</div>
        <div className="text-green-400 text-xs mt-1">🏭 All Monitored</div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400 mb-1">{metrics.onlineAssets}</div>
        <div className="text-xs text-gray-400">Online</div>
        <div className="text-green-400 text-xs mt-1">✅ Operational</div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-yellow-400 mb-1">{metrics.warningAssets}</div>
        <div className="text-xs text-gray-400">Warning</div>
        <div className="text-yellow-400 text-xs mt-1">⚠️ Needs Attention</div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-red-400 mb-1">{metrics.criticalAssets}</div>
        <div className="text-xs text-gray-400">Critical</div>
        <div className="text-red-400 text-xs mt-1">🚨 Immediate Action</div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-blue-400 mb-1">{metrics.avgUptime.toFixed(2)}%</div>
        <div className="text-xs text-gray-400">Avg Uptime</div>
        <div className="text-blue-400 text-xs mt-1">⏱️ This Month</div>
      </div>

      <div className="glass rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-purple-400 mb-1">{metrics.dataQuality.toFixed(1)}%</div>
        <div className="text-xs text-gray-400">Data Quality</div>
        <div className="text-purple-400 text-xs mt-1">📊 Accuracy</div>
      </div>
    </div>
  )
}

export default AssetMetrics