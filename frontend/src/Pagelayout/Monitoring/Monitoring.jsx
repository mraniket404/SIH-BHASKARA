import React, { useState, useEffect } from 'react'
import AssetMetrics from './AssetMetrics'
import RealTimeCharts from './RealTimeCharts'
import AssetHealthPanel from './AssetHealthPanel'
import EquipmentMonitor from './EquipmentMonitor'
import PerformanceAnalytics from './PerformanceAnalytics'
import SensorGrid from './SensorGrid'

const Monitoring = () => {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())
  const [selectedView, setSelectedView] = useState('overview')

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdateTime(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const views = [
    { id: 'overview', name: 'Overview', icon: '🏠' },
    { id: 'assets', name: 'Assets', icon: '🔧' },
    { id: 'performance', name: 'Performance', icon: '📈' },
    { id: 'sensors', name: 'Sensors', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '🔍' }
  ]

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Real-time Asset Monitoring
            </h1>
            <p className="text-gray-300 text-lg">
              Comprehensive monitoring of all substation assets and systems
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-green-400 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live Monitoring Active</span>
            </div>
            <p className="text-gray-400">
              Updated {lastUpdateTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="glass rounded-xl p-4">
        <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 ${
                selectedView === view.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{view.icon}</span>
              <span className="font-medium">{view.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {selectedView === 'overview' && (
          <>
            <AssetMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RealTimeCharts />
              </div>
              <div className="lg:col-span-1">
                <AssetHealthPanel />
              </div>
            </div>
            <SensorGrid />
          </>
        )}

        {selectedView === 'assets' && (
          <EquipmentMonitor />
        )}

        {selectedView === 'performance' && (
          <PerformanceAnalytics />
        )}

        {selectedView === 'sensors' && (
          <SensorGrid detailed={true} />
        )}

        {selectedView === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceAnalytics />
            <AssetHealthPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default Monitoring