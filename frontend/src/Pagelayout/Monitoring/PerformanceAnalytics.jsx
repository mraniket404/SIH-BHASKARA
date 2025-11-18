import React, { useState, useEffect } from 'react'

const PerformanceAnalytics = () => {
  const [analytics, setAnalytics] = useState({})
  const [selectedMetric, setSelectedMetric] = useState('efficiency')

  useEffect(() => {
    setAnalytics({
      efficiency: { value: 96.2, trend: 'up', change: 0.5 },
      availability: { value: 99.98, trend: 'stable', change: 0.0 },
      reliability: { value: 99.92, trend: 'up', change: 0.1 },
      maintenance: { value: 87.5, trend: 'down', change: -2.3 }
    })
  }, [])

  const metrics = [
    { id: 'efficiency', name: 'Efficiency', unit: '%', color: 'green' },
    { id: 'availability', name: 'Availability', unit: '%', color: 'blue' },
    { id: 'reliability', name: 'Reliability', unit: '%', color: 'purple' },
    { id: 'maintenance', name: 'Maintenance', unit: 'Score', color: 'yellow' }
  ]

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

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance Analytics</h3>
        <select 
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white"
        >
          {metrics.map(metric => (
            <option key={metric.id} value={metric.id}>{metric.name}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map(metric => {
          const data = analytics[metric.id]
          if (!data) return null
          
          return (
            <div key={metric.id} className="bg-gray-800 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>
                {data.value}{metric.unit === '%' ? '%' : ''}
              </div>
              <div className="text-xs text-gray-400">{metric.name}</div>
              <div className={`text-xs ${getTrendColor(data.trend)} mt-1`}>
                {getTrendIcon(data.trend)} {data.change > 0 ? '+' : ''}{data.change}%
              </div>
            </div>
          )
        })}
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="bg-gray-800 rounded-lg p-8 h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-gray-400">Performance Analytics Chart</div>
          <div className="text-sm text-gray-500 mt-2">
            {selectedMetric === 'efficiency' && 'Energy efficiency trends and optimization opportunities'}
            {selectedMetric === 'availability' && 'System availability and uptime analysis'}
            {selectedMetric === 'reliability' && 'Reliability metrics and failure predictions'}
            {selectedMetric === 'maintenance' && 'Maintenance performance and cost analysis'}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-white mb-3">Key Insights</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div>• Transformer T2 showing 5% higher losses than expected</div>
          <div>• Circuit breaker operations increased by 12% this month</div>
          <div>• Predictive maintenance can save 15% in operational costs</div>
          <div>• Peak load hours shifting to evening periods</div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceAnalytics