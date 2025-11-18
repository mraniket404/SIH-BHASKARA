import React, { useState, useEffect } from 'react'

const LiveSensorData = () => {
  const [sensorData, setSensorData] = useState({
    bus400kV: 399.7,
    bus220kV: 219.4,
    transformerT1: 248.8
  })

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        bus400kV: 399.7 + (Math.random() - 0.5) * 0.6,
        bus220kV: 219.4 + (Math.random() - 0.5) * 0.4,
        transformerT1: 248.8 + (Math.random() - 0.5) * 5
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Live Sensor Data</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Configure</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 400kV Bus Voltage */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">400kV Bus Voltage</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl font-bold text-white live-data">
            {sensorData.bus400kV.toFixed(1)} kV
          </div>
          <div className="text-xs text-green-400 mt-1">Within normal range</div>
        </div>

        {/* 220kV Bus Voltage */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">220kV Bus Voltage</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-white">
            {sensorData.bus220kV.toFixed(1)} kV
          </div>
          <div className="text-xs text-green-400 mt-1">Stable operation</div>
        </div>

        {/* Transformer T1 Current */}
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Transformer T1 Current</h3>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-white">
            {sensorData.transformerT1.toFixed(1)} A
          </div>
          <div className="text-xs text-yellow-400 mt-1">Moderate load</div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span>Filter</span>
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
          Configure
        </button>
      </div>
    </div>
  )
}

export default LiveSensorData