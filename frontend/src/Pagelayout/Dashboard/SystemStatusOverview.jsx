import React, { useState, useEffect } from 'react'

const SystemStatusOverview = () => {
  const [systemMetrics, setSystemMetrics] = useState({
    overallHealth: 87,
    dataQuality: 99.2,
    connectionStatus: 'connected',
    lastUpdate: new Date(),
    activeAlerts: 3,
    totalAssets: 24,
    onlineAssets: 22,
    maintenanceScheduled: 2
  })

  const [quickStats, setQuickStats] = useState([
    {
      id: 'power-flow',
      label: 'Power Flow',
      value: '1,247',
      unit: 'MW',
      trend: 'up',
      trendValue: '+2.3%',
      status: 'healthy',
      icon: '⚡'
    },
    {
      id: 'load-factor',
      label: 'Load Factor',
      value: '78.5',
      unit: '%',
      trend: 'stable',
      trendValue: '0.1%',
      status: 'healthy',
      icon: '📊'
    },
    {
      id: 'efficiency',
      label: 'Efficiency',
      value: '96.8',
      unit: '%',
      trend: 'up',
      trendValue: '+0.5%',
      status: 'healthy',
      icon: '🎯'
    },
    {
      id: 'availability',
      label: 'Availability',
      value: '99.1',
      unit: '%',
      trend: 'down',
      trendValue: '-0.2%',
      status: 'warning',
      icon: '🛡️'
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        lastUpdate: new Date(),
        overallHealth: Math.max(85, Math.min(95, prev.overallHealth + (Math.random() - 0.5) * 2)),
        dataQuality: Math.max(98, Math.min(100, prev.dataQuality + (Math.random() - 0.5) * 0.5))
      }))

      setQuickStats(prev => prev.map(stat => ({
        ...stat,
        value: (parseFloat(stat.value) + (Math.random() - 0.5) * 2).toFixed(1)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getHealthColor = (health) => {
    if (health >= 90) return 'text-green-400'
    if (health >= 75) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      default: return '➡️'
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📈</span>
            <h2 className="text-xl font-semibold text-white">System Health</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>🕒</span>
            <span>Updated {systemMetrics.lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Overall Health */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#374151"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={systemMetrics.overallHealth >= 90 ? '#10B981' : 
                          systemMetrics.overallHealth >= 75 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${systemMetrics.overallHealth * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getHealthColor(systemMetrics.overallHealth)}`}>
                  {Math.round(systemMetrics.overallHealth)}%
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-white">Overall Health</h3>
            <p className="text-xs text-gray-400">System performance</p>
          </div>

          {/* Connection Status */}
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-3 bg-green-500/10 rounded-full">
              <span className="text-3xl">📶</span>
            </div>
            <h3 className="text-sm font-medium text-white">Connection</h3>
            <p className="text-xs text-green-400 capitalize">{systemMetrics.connectionStatus}</p>
          </div>

          {/* Data Quality */}
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-3 bg-blue-500/10 rounded-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{systemMetrics.dataQuality}%</div>
                <span className="text-blue-400">💾</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-white">Data Quality</h3>
            <p className="text-xs text-gray-400">Real-time accuracy</p>
          </div>

          {/* Asset Status */}
          <div className="text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-3 bg-gray-500/20 rounded-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{systemMetrics.onlineAssets}/{systemMetrics.totalAssets}</div>
                <span className="text-gray-400">🔧</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-white">Assets Online</h3>
            <p className="text-xs text-gray-400">Active monitoring</p>
          </div>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${stat.status === 'healthy' ? 'bg-green-500/20' : 
                  stat.status === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'}
              `}>
                <span className={`text-lg ${getStatusColor(stat.status)}`}>
                  {stat.icon}
                </span>
              </div>
              <div className={`
                w-2 h-2 rounded-full
                ${stat.status === 'healthy' ? 'bg-green-500' : 
                  stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}
              `} />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.unit}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className={`text-xs ${getTrendColor(stat.trend)}`}>
                  {getTrendIcon(stat.trend)}
                </span>
                <span className={`text-xs font-medium ${getTrendColor(stat.trend)}`}>
                  {stat.trendValue}
                </span>
                <span className="text-xs text-gray-400">vs last hour</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`
                w-3 h-3 rounded-full animate-pulse
                ${systemMetrics.activeAlerts > 0 ? 'bg-red-500' : 'bg-green-500'}
              `} />
              <span className="text-sm font-medium text-white">
                {systemMetrics.activeAlerts > 0 
                  ? `${systemMetrics.activeAlerts} Active Alerts` 
                  : 'All Systems Normal'
                }
              </span>
            </div>
            {systemMetrics.maintenanceScheduled > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>📅</span>
                <span>{systemMetrics.maintenanceScheduled} scheduled maintenance</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2 text-sm">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2 text-sm">
              <span>⚙️</span>
              <span>Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemStatusOverview