import React, { useState, useEffect } from 'react'

const SensorGrid = ({ detailed = false }) => {
  const [sensors, setSensors] = useState([])

  useEffect(() => {
    const sensorData = [
      { id: 1, name: 'Voltage Sensor 1', type: 'voltage', value: 398.5, unit: 'kV', status: 'normal' },
      { id: 2, name: 'Current Sensor 1', type: 'current', value: 1245, unit: 'A', status: 'normal' },
      { id: 3, name: 'Temp Sensor T1', type: 'temperature', value: 65, unit: '°C', status: 'warning' },
      { id: 4, name: 'Frequency Sensor', type: 'frequency', value: 50.01, unit: 'Hz', status: 'normal' },
      { id: 5, name: 'Vibration Sensor 1', type: 'vibration', value: 2.1, unit: 'mm/s', status: 'normal' },
      { id: 6, name: 'Pressure Sensor 1', type: 'pressure', value: 4.2, unit: 'bar', status: 'normal' }
    ]
    setSensors(sensorData)

    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * (sensor.type === 'voltage' ? 0.5 : 10)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'border-green-500'
      case 'warning': return 'border-yellow-500'
      case 'critical': return 'border-red-500'
      default: return 'border-gray-500'
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-500/10'
      case 'warning': return 'bg-yellow-500/10'
      case 'critical': return 'bg-red-500/10'
      default: return 'bg-gray-500/10'
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          {detailed ? 'Detailed Sensor Data' : 'Sensor Grid'}
        </h3>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Live Sensors</span>
        </div>
      </div>

      <div className={`grid gap-4 ${detailed ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
        {sensors.map(sensor => (
          <div key={sensor.id} className={`bg-gray-800 rounded-lg p-4 border-l-4 ${getStatusColor(sensor.status)} ${getStatusBg(sensor.status)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-white truncate">{sensor.name}</div>
              <div className={`w-2 h-2 rounded-full ${
                sensor.status === 'normal' ? 'bg-green-500' :
                sensor.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
            
            <div className="text-2xl font-bold text-white mb-1">
              {sensor.value.toFixed(1)}{sensor.unit}
            </div>
            
            <div className="text-xs text-gray-400 capitalize">{sensor.type}</div>
            
            {detailed && (
              <div className="mt-3 text-xs text-gray-400">
                Last updated: Just now
              </div>
            )}
          </div>
        ))}
      </div>

      {!detailed && (
        <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
          <span>24 active sensors • 2 with warnings</span>
          <button className="text-blue-400 hover:text-blue-300">
            View All Sensors →
          </button>
        </div>
      )}
    </div>
  )
}

export default SensorGrid