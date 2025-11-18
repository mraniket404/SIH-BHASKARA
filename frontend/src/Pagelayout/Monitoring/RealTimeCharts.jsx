import React, { useState, useEffect } from 'react'

const RealTimeCharts = () => {
  const [chartData, setChartData] = useState({
    voltage: [],
    current: [],
    temperature: []
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        voltage: [...prev.voltage.slice(-19), Math.random() * 10 + 395].slice(-20),
        current: [...prev.current.slice(-19), Math.random() * 200 + 1100].slice(-20),
        temperature: [...prev.temperature.slice(-19), Math.random() * 10 + 60].slice(-20)
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const renderChart = (data, color, title, unit) => (
    <div className="bg-gray-800 rounded-lg p-4">
      <h4 className="text-lg font-semibold text-white mb-4">{title}</h4>
      <div className="h-32 flex items-end space-x-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-400"
            style={{ height: `${(value / Math.max(...data)) * 100}%` }}
            title={`${value.toFixed(1)} ${unit}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Min: {Math.min(...data).toFixed(1)}{unit}</span>
        <span>Max: {Math.max(...data).toFixed(1)}{unit}</span>
        <span>Current: {data[data.length - 1]?.toFixed(1)}{unit}</span>
      </div>
    </div>
  )

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Real-time Monitoring</h3>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderChart(chartData.voltage, 'blue', 'Voltage', 'kV')}
        {renderChart(chartData.current, 'green', 'Current', 'A')}
        {renderChart(chartData.temperature, 'red', 'Temperature', '°C')}
      </div>
    </div>
  )
}

export default RealTimeCharts