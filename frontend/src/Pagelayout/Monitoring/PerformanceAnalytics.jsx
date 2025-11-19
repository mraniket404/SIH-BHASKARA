import React, { useState, useEffect } from 'react'

const PerformanceAnalytics = () => {
  const [analytics, setAnalytics] = useState({})

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

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance Analytics</h3>
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
            </div>
          )
        })}
      </div>

      {/* Analytics Chart Placeholder */}
      <div className="bg-gray-800 rounded-lg p-8 h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <div className="text-gray-400">Performance Analytics Chart</div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceAnalytics