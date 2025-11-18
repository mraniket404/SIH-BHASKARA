import React, { useState } from 'react'

const TopologyView = () => {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const substationData = {
    buses: [
      {
        id: 'bus-400kv',
        name: '400kV Bus',
        voltage: 398.5,
        frequency: 50.02,
        status: 'healthy',
        position: { x: 200, y: 100 }
      },
      {
        id: 'bus-220kv-1',
        name: '220kV Bus 1',
        voltage: 218.7,
        frequency: 49.98,
        status: 'healthy',
        position: { x: 100, y: 250 }
      },
      {
        id: 'bus-220kv-2',
        name: '220kV Bus 2',
        voltage: 219.2,
        frequency: 50.01,
        status: 'warning',
        position: { x: 300, y: 250 }
      }
    ],
    transformers: [
      {
        id: 't1',
        name: 'Transformer T1',
        type: '400/220kV',
        loading: 78.5,
        temperature: 65.2,
        status: 'healthy',
        position: { x: 150, y: 175 }
      },
      {
        id: 't2',
        name: 'Transformer T2',
        type: '400/220kV',
        loading: 82.1,
        temperature: 71.8,
        status: 'warning',
        position: { x: 250, y: 175 }
      }
    ]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'critical': return '#EF4444'
      case 'maintenance': return '#6366F1'
      default: return '#6B7280'
    }
  }

  const handleComponentClick = (component, type) => {
    setSelectedComponent({ ...component, type })
  }

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🔌</span>
          <h2 className="text-lg font-semibold text-white">Substation Topology</h2>
          <div className="flex items-center space-x-1 text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2 text-sm">
            <span>🔄</span>
            <span>Reset View</span>
          </button>
          <button 
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <span>{isFullscreen ? '🗗' : '🗖'}</span>
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="bg-gray-900 rounded-lg p-4 min-h-96 relative overflow-hidden">
            {/* Simple topology visualization */}
            <div className="relative h-80 bg-gray-800 rounded border border-gray-700">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: `linear-gradient(#4B5563 1px, transparent 1px),
                                  linear-gradient(90deg, #4B5563 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Components */}
              {substationData.buses.map(bus => (
                <div
                  key={bus.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${bus.position.x}px`, top: `${bus.position.y}px` }}
                  onClick={() => handleComponentClick(bus, 'bus')}
                >
                  <div 
                    className="w-16 h-8 rounded flex items-center justify-center text-white text-xs font-medium border-2"
                    style={{ 
                      backgroundColor: getStatusColor(bus.status),
                      borderColor: '#1E40AF'
                    }}
                  >
                    {bus.name}
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-1">
                    {bus.voltage}kV
                  </div>
                </div>
              ))}
              
              {substationData.transformers.map(transformer => (
                <div
                  key={transformer.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${transformer.position.x}px`, top: `${transformer.position.y}px` }}
                  onClick={() => handleComponentClick(transformer, 'transformer')}
                >
                  <div 
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-bold border-2"
                    style={{ borderColor: getStatusColor(transformer.status) }}
                  >
                    T
                  </div>
                  <div className="text-center text-xs text-white mt-1">
                    {transformer.name}
                  </div>
                  <div className="text-center text-xs text-gray-400">
                    {transformer.loading}%
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-green-500 rounded" />
                  <span className="text-gray-400">Healthy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-yellow-500 rounded" />
                  <span className="text-gray-400">Warning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-red-500 rounded" />
                  <span className="text-gray-400">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Component Details Panel */}
        {selectedComponent && (
          <div className="w-80 border-l border-gray-700 bg-gray-750">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Component Details</h3>
                <button 
                  className="p-1 hover:bg-gray-600 rounded text-gray-400"
                  onClick={() => setSelectedComponent(null)}
                >
                  <span>✕</span>
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white">{selectedComponent.name}</h4>
                <p className="text-sm text-gray-400 capitalize">{selectedComponent.type}</p>
              </div>

              <div className="space-y-3">
                {selectedComponent.type === 'bus' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Voltage:</span>
                      <span className="text-sm font-medium text-white">{selectedComponent.voltage} kV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Frequency:</span>
                      <span className="text-sm font-medium text-white">{selectedComponent.frequency} Hz</span>
                    </div>
                  </>
                )}

                {selectedComponent.type === 'transformer' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Type:</span>
                      <span className="text-sm font-medium text-white">{selectedComponent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Loading:</span>
                      <span className="text-sm font-medium text-white">{selectedComponent.loading}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Temperature:</span>
                      <span className="text-sm font-medium text-white">{selectedComponent.temperature}°C</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Status:</span>
                  <span className={`text-sm font-medium capitalize ${
                    selectedComponent.status === 'healthy' ? 'text-green-400' :
                    selectedComponent.status === 'warning' ? 'text-yellow-400' :
                    selectedComponent.status === 'critical' ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {selectedComponent.status}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm">
                  <span>⚙️</span>
                  <span>Configure</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TopologyView