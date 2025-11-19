import React, { useState, useEffect } from 'react'

const EquipmentMonitor = () => {
  const [equipment, setEquipment] = useState([])

  useEffect(() => {
    const equipmentData = [
      {
        id: 1, name: 'Transformer T1', type: 'transformer',
        metrics: { 
          primaryVoltage: 398.5, 
          secondaryVoltage: 220.1, 
          current: 1245, 
          oilTemp: 65, 
          windingTemp: 68,
          load: 82 
        },
        status: 'healthy',
        location: 'Bay 1'
      },
      {
        id: 2, name: 'Transformer T2', type: 'transformer', 
        metrics: { 
          primaryVoltage: 397.8, 
          secondaryVoltage: 219.8, 
          current: 1310, 
          oilTemp: 71, 
          windingTemp: 75,
          load: 85 
        },
        status: 'warning',
        location: 'Bay 2'
      },
      {
        id: 3, name: 'Circuit Breaker CB1', type: 'breaker',
        metrics: { status: 'closed', operations: 1247, wear: 12 },
        status: 'healthy',
        location: 'Switchyard'
      },
      {
        id: 4, name: 'Reactor R1', type: 'reactor',
        metrics: { current: 890, temperature: 58, reactance: 45.2 },
        status: 'healthy',
        location: 'Reactor Bay'
      }
    ]
    setEquipment(equipmentData)

    // Real-time updates
    const interval = setInterval(() => {
      setEquipment(prev => prev.map(item => ({
        ...item,
        metrics: {
          ...item.metrics,
          primaryVoltage: item.metrics.primaryVoltage + (Math.random() - 0.5) * 0.5,
          secondaryVoltage: item.metrics.secondaryVoltage + (Math.random() - 0.5) * 0.3,
          current: item.metrics.current + (Math.random() - 0.5) * 10,
          oilTemp: item.metrics.oilTemp + (Math.random() - 0.5) * 0.5,
          windingTemp: item.metrics.windingTemp + (Math.random() - 0.5) * 0.5,
          temperature: item.metrics.temperature + (Math.random() - 0.5) * 0.5
        }
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Equipment Monitor</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map(item => (
            <div 
              key={item.id} 
              className="glass rounded-xl p-4 border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-lg font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-gray-400 capitalize">{item.type} • {item.location}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'healthy' ? 'bg-green-500' :
                  item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>

              <div className="space-y-2">
                {Object.entries(item.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-white font-medium">
                      {typeof value === 'number' ? value.toFixed(1) : value}
                      {key.includes('Voltage') ? ' kV' : 
                       key.includes('current') ? ' A' : 
                       key.includes('Temp') || key.includes('temperature') ? '°C' : 
                       key === 'load' ? '%' : 
                       key === 'reactance' ? ' Ω' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EquipmentMonitor