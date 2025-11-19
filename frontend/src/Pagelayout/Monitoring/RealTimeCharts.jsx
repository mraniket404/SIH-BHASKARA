import React, { useState, useEffect, useRef } from 'react'

const RealTimeCharts = () => {
  const [chartData, setChartData] = useState({
    voltage: Array(20).fill(0).map(() => Math.random() * 10 + 395),
    current: Array(20).fill(0).map(() => Math.random() * 200 + 1100),
    temperature: Array(20).fill(0).map(() => Math.random() * 10 + 60)
  })
  
  const [selectedChart, setSelectedChart] = useState('voltage')
  const [isPaused, setIsPaused] = useState(false)
  const [timeRange, setTimeRange] = useState('5m')

  const chartRef = useRef(null)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setChartData(prev => ({
        voltage: [...prev.voltage.slice(1), Math.random() * 10 + 395],
        current: [...prev.current.slice(1), Math.random() * 200 + 1100],
        temperature: [...prev.temperature.slice(1), Math.random() * 10 + 60]
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  const charts = [
    { id: 'voltage', name: 'Voltage', unit: 'kV', color: 'blue', min: 390, max: 410 },
    { id: 'current', name: 'Current', unit: 'A', color: 'green', min: 1000, max: 1400 },
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

  const handleExportChart = () => {
    alert(`Exporting ${selectedChart} chart data...`)
  }

  const handleFullscreen = () => {
    if (chartRef.current) {
      chartRef.current.requestFullscreen?.()
    }
  }

  return (
    <div ref={chartRef} className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Real-time Monitoring Charts</h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm"
          >
            <option value="1m">Last 1 min</option>
            <option value="5m">Last 5 min</option>
            <option value="15m">Last 15 min</option>
            <option value="1h">Last 1 hour</option>
          </select>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1 rounded-lg text-sm flex items-center space-x-2 ${
              isPaused 
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <span>{isPaused ? '▶' : '⏸'}</span>
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            onClick={handleExportChart}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center space-x-2"
          >
            <span>📥</span>
            <span>Export</span>
          </button>

          <button
            onClick={handleFullscreen}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
          >
            <span>⛶</span>
          </button>
        </div>
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

      {/* Chart Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {charts.map(chart => {
          const data = chartData[chart.id]
          const current = data[data.length - 1]
          const avg = data.reduce((a, b) => a + b, 0) / data.length
          
          return (
            <div
              key={chart.id}
              onClick={() => setSelectedChart(chart.id)}
              className={`bg-gray-800 rounded-lg p-3 cursor-pointer transition-all duration-300 ${
                selectedChart === chart.id ? `border-l-4 border-${chart.color}-500` : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{chart.name}</span>
                <div className={`w-2 h-2 bg-${chart.color}-500 rounded-full`}></div>
              </div>
              <div className="text-lg font-bold text-white mt-1">
                {current.toFixed(1)} {chart.unit}
              </div>
              <div className="text-xs text-gray-400">
                Avg: {avg.toFixed(1)} {chart.unit}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RealTimeCharts