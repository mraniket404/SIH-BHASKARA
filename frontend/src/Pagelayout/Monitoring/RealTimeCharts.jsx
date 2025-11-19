import React, { useState, useEffect } from 'react'

const RealTimeCharts = () => {
  const [chartData, setChartData] = useState({
    voltage: Array(20).fill(0).map(() => Math.random() * 10 + 395),
    current: Array(20).fill(0).map(() => Math.random() * 200 + 1100),
    frequency: Array(20).fill(0).map(() => Math.random() * 0.2 + 49.9),
    temperature: Array(20).fill(0).map(() => Math.random() * 10 + 60)
  })
  
  const [selectedChart, setSelectedChart] = useState('voltage')

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        voltage: [...prev.voltage.slice(1), Math.random() * 10 + 395],
        current: [...prev.current.slice(1), Math.random() * 200 + 1100],
        frequency: [...prev.frequency.slice(1), Math.random() * 0.2 + 49.9],
        temperature: [...prev.temperature.slice(1), Math.random() * 10 + 60]
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const charts = [
    { id: 'voltage', name: 'Voltage', unit: 'kV', color: 'blue', min: 390, max: 410 },
    { id: 'current', name: 'Current', unit: 'A', color: 'green', min: 1000, max: 1400 },
    { id: 'frequency', name: 'Frequency', unit: 'Hz', color: 'purple', min: 49.8, max: 50.2 },
    { id: 'temperature', name: 'Temperature', unit: '°C', color: 'red', min: 55, max: 75 }
  ]

  const currentChart = charts.find(chart => chart.id === selectedChart)

  const renderChart = () => {
    const data = chartData[selectedChart]
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const currentValue = data[data.length - 1]

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white">
              {currentValue.toFixed(1)} {currentChart.unit}
            </div>
            <div className="text-sm text-gray-400">
              Current {currentChart.name.toLowerCase()} reading
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Range</div>
            <div className="text-white font-medium">
              {minValue.toFixed(1)} - {maxValue.toFixed(1)} {currentChart.unit}
            </div>
          </div>
        </div>

        <div className="h-48 bg-gray-800 rounded-lg p-4">
          <div className="flex items-end justify-between h-full space-x-1">
            {data.map((value, index) => (
              <div
                key={index}
                className={`flex-1 bg-${currentChart.color}-500 rounded-t transition-all duration-300 hover:bg-${currentChart.color}-400 cursor-pointer`}
                style={{ 
                  height: `${((value - currentChart.min) / (currentChart.max - currentChart.min)) * 100}%` 
                }}
                title={`${value.toFixed(1)} ${currentChart.unit}`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <span>← Earlier</span>
          <span>Real-time {currentChart.name} Data</span>
          <span>Now →</span>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Real-time Parameters</h3>
      </div>

      {/* Chart Selector */}
      <div className="flex space-x-2 mb-6">
        {charts.map(chart => (
          <button
            key={chart.id}
            onClick={() => setSelectedChart(chart.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedChart === chart.id
                ? `bg-${chart.color}-600 text-white shadow-lg`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            {chart.name}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      {renderChart()}
    </div>
  )
}

export default RealTimeCharts