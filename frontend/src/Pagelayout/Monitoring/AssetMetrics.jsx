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
        dataQuality: 99.2 + (Math.random() - 0.5) * 0.1,
        onlineAssets: 22 + Math.floor(Math.random() * 2) - 1
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const metricConfig = {
    totalAssets: { 
      color: 'gray', 
      icon: '🏭',
      description: 'Total monitored assets in the system'
    },
    onlineAssets: { 
      color: 'green', 
      icon: '✅',
      description: 'Assets currently online and operational'
    },
    warningAssets: { 
      color: 'yellow', 
      icon: '⚠️',
      description: 'Assets requiring attention'
    },
    criticalAssets: { 
      color: 'red', 
      icon: '🚨',
      description: 'Assets requiring immediate action'
    },
    avgUptime: { 
      color: 'blue', 
      icon: '⏱️',
      description: 'Average system uptime this month'
    },
    dataQuality: { 
      color: 'purple', 
      icon: '📊',
      description: 'Data accuracy and reliability score'
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">System Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(metrics).map(([key, value]) => {
          const config = metricConfig[key]
          return (
            <div
              key={key}
              className="glass rounded-xl p-4 text-center cursor-pointer transition-all duration-300 border border-gray-600 hover:border-gray-500"
            >
              <div className={`text-2xl font-bold text-${config.color}-400 mb-1`}>
                {typeof value === 'number' ? value.toFixed(key.includes('avg') ? 2 : 0) : value}
                {key.includes('avg') || key.includes('Quality') ? '%' : ''}
              </div>
              <div className="text-xs text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className={`text-${config.color}-400 text-xs mt-1`}>
                {config.icon}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AssetMetrics