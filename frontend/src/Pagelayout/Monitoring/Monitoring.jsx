import React, { useState, useEffect } from 'react'
import AssetMetrics from './AssetMetrics'
import RealTimeCharts from './RealTimeCharts'
import AssetHealthPanel from './AssetHealthPanel'
import EquipmentMonitor from './EquipmentMonitor'
import PerformanceAnalytics from './PerformanceAnalytics'
import SensorGrid from './SensorGrid'
import SCADADashboard from './SCADADashboard'

const Monitoring = () => {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())
  const [selectedView, setSelectedView] = useState('scada')
  const [isLoading, setIsLoading] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(5000)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdateTime(new Date())
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  const views = [
    { id: 'scada', name: 'SCADA View', icon: '⚡', description: 'Real-time SCADA Dashboard' },
    { id: 'overview', name: 'Overview', icon: '🏠', description: 'System-wide monitoring overview' },
    { id: 'assets', name: 'Assets', icon: '🔧', description: 'Detailed asset monitoring' },
    { id: 'performance', name: 'Performance', icon: '📈', description: 'Performance analytics' },
    { id: 'sensors', name: 'Sensors', icon: '📊', description: 'Real-time sensor data' }
  ]

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setLastUpdateTime(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const getCurrentView = () => {
    const currentView = views.find(view => view.id === selectedView)
    return currentView || views[0]
  }

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {/* Header with Actions */}
      <div className="glass rounded-xl p-6 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  SCADA Real-time Monitoring
                </h1>
                <p className="text-gray-300 text-lg">
                  {getCurrentView().description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2 text-green-400 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Live Data</span>
              </div>
              <p className="text-gray-400 text-sm">
                Updated {lastUpdateTime.toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>🔄</span>
                )}
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Monitoring Views</h3>
          <select
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
          >
            <option value={1000}>1s Update</option>
            <option value={3000}>3s Update</option>
            <option value={5000}>5s Update</option>
            <option value={10000}>10s Update</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-300 text-center group
                ${selectedView === view.id 
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/20 transform scale-105' 
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 hover:transform hover:scale-105'
                }
              `}
            >
              <div className={`
                text-2xl mb-2 transition-transform duration-300
                ${selectedView === view.id ? 'scale-110' : 'group-hover:scale-110'}
              `}>
                {view.icon}
              </div>
              <div className={`
                font-semibold transition-colors duration-300
                ${selectedView === view.id ? 'text-blue-400' : 'text-gray-300 group-hover:text-white'}
              `}>
                {view.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-3 text-blue-400">
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Updating monitoring data...</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {selectedView === 'scada' && (
          <SCADADashboard />
        )}

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
      </div>
    </div>
  )
}

export default Monitoring