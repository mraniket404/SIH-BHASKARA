import React from 'react'

const MetricCard = ({ 
  title, 
  value, 
  unit, 
  status, 
  icon, 
  trend, 
  trendValue, 
  lastUpdate,
  onClick 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-400 border-l-green-500 bg-green-500/10'
      case 'warning': return 'text-yellow-400 border-l-yellow-500 bg-yellow-500/10'
      case 'critical': return 'text-red-400 border-l-red-500 bg-red-500/10'
      default: return 'text-gray-400 border-l-gray-500 bg-gray-500/10'
    }
  }

  const getTrendIcon = () => {
    if (trend === 'up') return '↗️'
    if (trend === 'down') return '↘️'
    return '➡️'
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400'
    if (trend === 'down') return 'text-red-400'
    return 'text-gray-400'
  }

  return (
    <div 
      className={`
        relative bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 cursor-pointer
        transition-all duration-200 border-l-4 ${getStatusColor()}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`
            flex items-center justify-center w-8 h-8 rounded-lg
            ${status === 'healthy' ? 'bg-green-500/20' : 
              status === 'warning' ? 'bg-yellow-500/20' : 
              status === 'critical' ? 'bg-red-500/20' : 'bg-gray-500/20'}
          `}>
            <span className="text-sm">{icon}</span>
          </div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
        <div className={`
          w-2 h-2 rounded-full animate-pulse
          ${status === 'healthy' ? 'bg-green-500' : 
            status === 'warning' ? 'bg-yellow-500' : 
            status === 'critical' ? 'bg-red-500' : 'bg-gray-500'}
        `} />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-white">{value}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>

        {trend && (
          <div className="flex items-center space-x-1">
            <span className={`text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
            </span>
            <span className={`text-xs font-medium ${getTrendColor()}`}>
              {trendValue}
            </span>
            <span className="text-xs text-gray-400">vs last hour</span>
          </div>
        )}

        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <span>🕒</span>
          <span>Updated {lastUpdate}</span>
        </div>
      </div>
      {status === 'critical' && (
        <div className="absolute -top-1 -right-1">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  )
}

export default MetricCard