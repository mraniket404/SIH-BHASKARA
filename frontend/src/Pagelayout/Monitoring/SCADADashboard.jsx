import React, { useState, useEffect } from 'react'

const SCADADashboard = () => {
  const [scadaData, setScadaData] = useState({})

  useEffect(() => {
    // Initialize SCADA data
    const initialData = {
      // Voltage Data
      transformerT1Voltage: 398.5,
      transformerT2Voltage: 397.8,
      incomingFeederVoltage: 400.2,
      outgoingFeederVoltage: 220.1,
      
      // Current Data
      ctReadings: 1245,
      lineCurrents: 1310,
      transformerLoadCurrent: 1250,
      
      // Frequency
      gridFrequency: 50.01,
      
      // Breaker Status
      breakerCB1: 'closed',
      breakerCB2: 'open',
      breakerCB3: 'closed',
      
      // Isolator Status
      isolatorISO1: 'on',
      isolatorISO2: 'off',
      isolatorISO3: 'on',
      
      // Temperature
      transformerOilTemp: 65,
      windingTemp: 71,
      reactorTemp: 58,
      
      // Warnings & Faults
      warnings: [
        { id: 1, type: 'high_temperature', message: 'Transformer T2 winding temperature high', severity: 'warning' },
        { id: 2, type: 'overload', message: 'Line 1 current overload', severity: 'warning' }
      ],
      faults: [
        { id: 1, type: 'cb_failure', message: 'Circuit Breaker CB2 failure', severity: 'critical' }
      ]
    }
    
    setScadaData(initialData)

    // Real-time updates
    const interval = setInterval(() => {
      setScadaData(prev => ({
        ...prev,
        transformerT1Voltage: 395 + Math.random() * 10,
        transformerT2Voltage: 395 + Math.random() * 10,
        incomingFeederVoltage: 398 + Math.random() * 4,
        outgoingFeederVoltage: 218 + Math.random() * 4,
        ctReadings: 1200 + Math.random() * 100,
        lineCurrents: 1250 + Math.random() * 100,
        transformerLoadCurrent: 1200 + Math.random() * 100,
        gridFrequency: 49.9 + Math.random() * 0.4,
        transformerOilTemp: 60 + Math.random() * 10,
        windingTemp: 65 + Math.random() * 10,
        reactorTemp: 55 + Math.random() * 8
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getBreakerColor = (status) => {
    return status === 'closed' ? 'bg-green-500' : 'bg-red-500'
  }

  const getIsolatorColor = (status) => {
    return status === 'on' ? 'bg-green-500' : 'bg-red-500'
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 border-red-500'
      case 'warning': return 'bg-yellow-500 border-yellow-500'
      default: return 'bg-gray-500 border-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main SCADA Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Voltage Panel */}
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">🔹 Voltage Monitoring (kV)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Transformer T1</span>
              <span className="text-green-400 font-bold">{scadaData.transformerT1Voltage?.toFixed(1)} kV</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Transformer T2</span>
              <span className="text-green-400 font-bold">{scadaData.transformerT2Voltage?.toFixed(1)} kV</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Incoming Feeder</span>
              <span className="text-blue-400 font-bold">{scadaData.incomingFeederVoltage?.toFixed(1)} kV</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Outgoing Feeder</span>
              <span className="text-blue-400 font-bold">{scadaData.outgoingFeederVoltage?.toFixed(1)} kV</span>
            </div>
          </div>
        </div>

        {/* Current Panel */}
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">🔹 Current Readings (A)</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">CT Readings</span>
              <span className="text-yellow-400 font-bold">{scadaData.ctReadings?.toFixed(0)} A</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Line Currents</span>
              <span className="text-yellow-400 font-bold">{scadaData.lineCurrents?.toFixed(0)} A</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
              <span className="text-gray-300">Transformer Load</span>
              <span className="text-yellow-400 font-bold">{scadaData.transformerLoadCurrent?.toFixed(0)} A</span>
            </div>
          </div>
        </div>

        {/* Frequency & Status Panel */}
        <div className="glass rounded-xl p-6 lg:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">🔹 System Status</h3>
          <div className="space-y-4">
            {/* Frequency */}
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {scadaData.gridFrequency?.toFixed(2)} Hz
              </div>
              <div className="text-sm text-gray-400">Grid Frequency</div>
            </div>

            {/* Breaker Status */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Breaker Status</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getBreakerColor(scadaData.breakerCB1)}`}></div>
                  <div className="text-xs text-gray-400">CB1</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getBreakerColor(scadaData.breakerCB2)}`}></div>
                  <div className="text-xs text-gray-400">CB2</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getBreakerColor(scadaData.breakerCB3)}`}></div>
                  <div className="text-xs text-gray-400">CB3</div>
                </div>
              </div>
            </div>

            {/* Isolator Status */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Isolator Status</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getIsolatorColor(scadaData.isolatorISO1)}`}></div>
                  <div className="text-xs text-gray-400">ISO1</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getIsolatorColor(scadaData.isolatorISO2)}`}></div>
                  <div className="text-xs text-gray-400">ISO2</div>
                </div>
                <div className="text-center">
                  <div className={`w-4 h-4 rounded-full mx-auto mb-1 ${getIsolatorColor(scadaData.isolatorISO3)}`}></div>
                  <div className="text-xs text-gray-400">ISO3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Temperature Monitoring */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">🔹 Temperature Monitoring (°C)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {scadaData.transformerOilTemp?.toFixed(1)}°C
            </div>
            <div className="text-sm text-gray-400">Transformer Oil Temp</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {scadaData.windingTemp?.toFixed(1)}°C
            </div>
            <div className="text-sm text-gray-400">Winding Temperature</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {scadaData.reactorTemp?.toFixed(1)}°C
            </div>
            <div className="text-sm text-gray-400">Reactor Temperature</div>
          </div>
        </div>
      </div>

      {/* Warnings & Faults */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warnings */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚠️ Warnings</h3>
          <div className="space-y-2">
            {scadaData.warnings?.map(warning => (
              <div key={warning.id} className={`p-3 rounded-lg border-l-4 ${getSeverityColor(warning.severity)} bg-gray-800`}>
                <div className="text-white text-sm">{warning.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Faults */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">🚨 Faults</h3>
          <div className="space-y-2">
            {scadaData.faults?.map(fault => (
              <div key={fault.id} className={`p-3 rounded-lg border-l-4 ${getSeverityColor(fault.severity)} bg-gray-800`}>
                <div className="text-white text-sm">{fault.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Data Flow Visualization */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">🔹 Real-time Data Flow</h3>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400">Data Flowing Normally</span>
            </div>
            <div className="text-gray-400 text-sm">
              Last update: {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          {/* Simple data flow animation */}
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-blue-400 text-2xl">⚡</span>
              </div>
              <div className="text-xs text-gray-400">Generation</div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 relative">
              <div className="absolute top-0 left-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-purple-400 text-2xl">🔌</span>
              </div>
              <div className="text-xs text-gray-400">Transmission</div>
            </div>
            
            <div className="flex-1 h-1 bg-green-500 relative">
              <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-400 text-2xl">🏠</span>
              </div>
              <div className="text-xs text-gray-400">Distribution</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SCADADashboard