import React, { useState, useEffect } from 'react'

const EquipmentMonitor = () => {
  const [equipment, setEquipment] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const equipmentData = [
      {
        id: 1, name: 'Transformer T1', type: 'transformer',
        metrics: { voltage: 398.5, current: 1245, temperature: 65, load: 82 },
        status: 'healthy',
        lastMaintenance: '2024-11-15',
        location: 'Bay 1'
      },
      {
        id: 2, name: 'Transformer T2', type: 'transformer', 
        metrics: { voltage: 397.8, current: 1310, temperature: 71, load: 85 },
        status: 'warning',
        lastMaintenance: '2024-10-20',
        location: 'Bay 2'
      },
      {
        id: 3, name: 'Circuit Breaker CB1', type: 'breaker',
        metrics: { status: 'closed', operations: 1247, wear: 12 },
        status: 'healthy',
        lastMaintenance: '2024-11-10',
        location: 'Switchyard'
      },
      // ... more equipment data
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

  const filteredEquipment = equipment
    .filter(item => selectedType === 'all' || item.type === selectedType)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'status': return a.status.localeCompare(b.status)
        case 'load': return (b.metrics.load || 0) - (a.metrics.load || 0)
        default: return 0
      }
    })

  const handleEquipmentClick = (equipment) => {
    alert(`Opening details for ${equipment.name}`)
    // In real app, this would navigate to equipment detail page
  }

  const handleQuickAction = (equipment, action) => {
    alert(`${action} for ${equipment.name}`)
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="glass rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-80 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            >
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="load">Sort by Load</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              + Add Equipment
            </button>
          </div>
        </div>

        {/* Equipment Type Filter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {equipmentTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-center group ${
                selectedType === type.id 
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg' 
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
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
          <div 
            key={item.id} 
            className="glass rounded-xl p-4 border-l-4 border-green-500 hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleEquipmentClick(item)}
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

            <div className="space-y-2 mb-4">
              {Object.entries(item.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="text-white font-medium">
                    {typeof value === 'number' ? value.toFixed(1) : value}
                    {key === 'voltage' ? ' kV' : key === 'current' ? ' A' : key === 'temperature' ? '°C' : key === 'load' ? '%' : ''}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickAction(item, 'View Details')
                }}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Details
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickAction(item, 'Maintenance')
                }}
                className="flex-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm"
              >
                Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEquipment.length === 0 && (
        <div className="glass rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No equipment found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default EquipmentMonitor