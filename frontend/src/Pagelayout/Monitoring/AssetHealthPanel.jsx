import React, { useState, useEffect } from 'react'

const AssetHealthPanel = () => {
  const [assets, setAssets] = useState([])

  useEffect(() => {
    const initialAssets = [
      { id: 1, name: 'Transformer T1', type: 'Transformer', health: 95, status: 'healthy' },
      { id: 2, name: 'Transformer T2', type: 'Transformer', health: 82, status: 'warning' },
      { id: 3, name: 'Circuit Breaker CB1', type: 'Breaker', health: 98, status: 'healthy' },
      { id: 4, name: '400kV Busbar', type: 'Busbar', health: 99, status: 'healthy' },
      { id: 5, name: 'Line 1 Insulators', type: 'Transmission', health: 88, status: 'warning' },
      { id: 6, name: 'Capacitor Bank C1', type: 'Capacitor', health: 92, status: 'healthy' }
    ]
    setAssets(initialAssets)

    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => ({
        ...asset,
        health: Math.max(70, Math.min(99, asset.health + (Math.random() - 0.5)))
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500/20'
      case 'warning': return 'bg-yellow-500/20'
      case 'critical': return 'bg-red-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Asset Health Status</h3>
        <span className="text-green-400 text-sm">Updated just now</span>
      </div>

      <div className="space-y-3">
        {assets.map(asset => (
          <div key={asset.id} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-white font-medium">{asset.name}</div>
                <div className="text-gray-400 text-xs">{asset.type}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${getStatusBg(asset.status)} ${getStatusColor(asset.status)}`}>
                {asset.status}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    asset.status === 'healthy' ? 'bg-green-500' :
                    asset.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${asset.health}%` }}
                />
              </div>
              <div className="text-white text-sm font-medium w-12 text-right">
                {Math.round(asset.health)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetHealthPanel