import React, { useState, useEffect } from 'react'

const EquipmentMonitor = () => {
  const [equipment, setEquipment] = useState([])
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const equipmentData = [
      {
        id: 1, name: 'Transformer T1', type: 'transformer',
        metrics: { voltage: 398.5, current: 1245, temperature: 65, load: 82 },
        status: 'healthy'
      },
      {
        id: 2, name: 'Transformer T2', type: 'transformer', 
        metrics: { voltage: 397.8, current: 1310, temperature: 71, load: 85 },
        status: 'warning'
      },
      {
        id: 3, name: 'Circuit Breaker CB1', type: 'breaker',
        metrics: { status: 'closed', operations: 1247, wear: 12 },
        status: 'healthy'
      },
      {
        id: 4, name: '400kV Busbar', type: 'busbar',
        metrics: { voltage: 398.7, frequency: 50.01, load: 78 },
        status: 'healthy'
      },
      {
        id: 5, name: 'Line 1', type: 'transmission',
        metrics: { voltage: 398.2, current: 1180, power: 469.5 },
        status: 'healthy'
      },
      {
        id: 6, name: 'Capacitor Bank C1', type: 'capacitor',
        metrics: { voltage: 219.8, current: 380, kvar: 45.2 },
        status: 'healthy'
      }
    ]
    setEquipment(equipmentData)
  }, [])

  const equipmentTypes = [
    { id: 'all', name: 'All Equipment', count: equipment.length },
    { id: 'transformer', name: 'Transformers', count: equipment.filter(e => e.type === 'transformer').length },
    { id: 'breaker', name: 'Circuit Breakers', count: equipment.filter(e => e.type === 'breaker').length },
    { id: 'busbar', name: 'Busbars', count: equipment.filter(e => e.type === 'busbar').length },
    { id: 'transmission', name: 'Transmission', count: equipment.filter(e => e.type === 'transmission').length },
    { id: 'capacitor', name: 'Capacitors', count: equipment.filter(e => e.type === 'capacitor').length }
  ]

  const filteredEquipment = selectedType === 'all' 
    ? equipment 
    : equipment.filter(e => e.type === selectedType)

  return (
    <div className="space-y-6">
      {/* Equipment Type Filter */}
      <div className="glass rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {equipmentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                selectedType === type.id 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
            >
              <div className="text-sm font-medium text-white mb-1">{type.name}</div>
              <div className="text-xs text-gray-400">{type.count} items</div>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map(item => (
          <div key={item.id} className="glass rounded-xl p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-lg font-semibold text-white">{item.name}</div>
                <div className="text-sm text-gray-400 capitalize">{item.type}</div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                item.status === 'healthy' ? 'bg-green-500' :
                item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>

            <div className="space-y-2">
              {Object.entries(item.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EquipmentMonitor