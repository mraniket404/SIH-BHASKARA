import React, { useState, useEffect } from 'react'
import AlertsPanel from './AlertsPanel'
import MetricCard from './MetricCard'
import SystemStatusOverview from './SystemStatusOverview'
import TimeSeriesChart from './TimeSeriesChart'
import TopologyView from './TopologyView'
import LiveSensorData from './LiveSensorData'

const Dashboard = () => {
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdateTime(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Real-time Dashboard
        </h1>
        <p className="text-gray-300">
          Live monitoring and control for EHV 400/220 kV substation
        </p>
        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live • Updated {lastUpdateTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* System Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Health */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Overall Health</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">90%</div>
          <p className="text-sm text-gray-400">System performance</p>
        </div>

        {/* Connection */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Connection</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-3xl font-bold text-green-400 mb-2">99.5%</div>
          <p className="text-sm text-gray-400">Connected</p>
        </div>

        {/* Data Quality */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Data Quality</h3>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">98.2%</div>
          <p className="text-sm text-gray-400">Real-time accuracy</p>
        </div>

        {/* Assets Online */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Assets Online</h3>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-2">22/24</div>
          <p className="text-sm text-gray-400">Active monitoring</p>
        </div>
      </div>

      {/* Power Flow Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Power Flow</h3>
          <div className="text-2xl font-bold text-white mb-2">3.5 MV</div>
          <div className="text-sm text-green-400">+2.3% vs last hour</div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Load Factor</h3>
          <div className="text-2xl font-bold text-white mb-2">80.0%</div>
          <div className="text-sm text-red-400">– 0.1% vs last hour</div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Efficiency</h3>
          <div className="text-2xl font-bold text-white mb-2">99.5%</div>
          <div className="text-sm text-green-400">+9.5% vs last hour</div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
          <div className="text-2xl font-bold text-white mb-2">98.7%</div>
          <div className="text-sm text-green-400">+0.2% vs last hour</div>
        </div>
      </div>

      {/* Live Sensor Data Section */}
      <LiveSensorData />

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
        
        {/* Topology View */}
        <div className="lg:col-span-2">
          <TopologyView />
        </div>
      </div>

      {/* Time Series Chart */}
      <TimeSeriesChart />

      {/* System Status Overview */}
      <SystemStatusOverview />
    </div>
  )
}

export default Dashboard