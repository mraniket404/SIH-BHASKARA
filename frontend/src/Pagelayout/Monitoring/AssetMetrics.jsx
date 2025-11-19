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

  const [selectedMetric, setSelectedMetric] = useState(null)

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

  const handleMetricClick = (metricKey) => {
    setSelectedMetric(selectedMetric === metricKey ? null : metricKey)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(metrics).map(([key, value]) => {
          const config = metricConfig[key]
          return (
            <div
              key={key}
              onClick={() => handleMetricClick(key)}
              className={`
                glass rounded-xl p-4 text-center cursor-pointer transition-all duration-300
                ${selectedMetric === key 
                  ? `border-2 border-${config.color}-500 bg-${config.color}-500/20 transform scale-105 shadow-lg` 
                  : 'border border-gray-600 hover:border-gray-500 hover:transform hover:scale-105'
                }
              `}
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
              
              {/* Tooltip on hover/click */}
              {selectedMetric === key && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 border border-gray-600 rounded-lg p-3 text-xs text-gray-300 z-10 min-w-48">
                  {config.description}
                  <div className="mt-2 text-green-400">
                    Click to view detailed analysis
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detailed Metric View */}
      {selectedMetric && (
        <div className="glass rounded-xl p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {selectedMetric.replace(/([A-Z])/g, ' $1').trim()} - Detailed View
            </h3>
            <button 
              onClick={() => setSelectedMetric(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Trend Analysis</h4>
              <div className="h-32 bg-gray-700 rounded flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-2xl mb-2">📈</div>
                  <div>Trend chart for {selectedMetric}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Value:</span>
                  <span className="text-white font-medium">{metrics[selectedMetric]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">Normal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white">Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetMetrics