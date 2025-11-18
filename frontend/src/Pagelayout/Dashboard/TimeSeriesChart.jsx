import React, { useState, useEffect, useRef } from 'react';

// Mock ML and Backend Service
const MLBackendService = {
  // Simulate ML predictions
  predictAnomaly: (data, metric) => {
    const recentValues = data.slice(-10).map(d => d.value);
    const avg = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
    const variance = recentValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / recentValues.length;
    
    // Simulate ML anomaly detection
    const isAnomaly = variance > 100 || Math.random() < 0.03;
    const confidence = Math.random() * 0.8 + 0.2;
    
    return {
      isAnomaly,
      confidence: Math.round(confidence * 100),
      message: isAnomaly ? 'Volatility Alert' : 'Stable Pattern',
      severity: isAnomaly ? (confidence > 0.7 ? 'high' : 'medium') : 'low'
    };
  },

  // Simulate real data stream from backend - Stock market style
  streamData: (metric, callback) => {
    const intervals = {
      voltage: 500,
      current: 400,
      temperature: 800,
      frequency: 600
    };

    let lastValue = {
      voltage: 230,
      current: 150,
      temperature: 45,
      frequency: 50
    }[metric];

    return setInterval(() => {
      const baseValues = {
        voltage: { target: 230, variation: 8 },
        current: { target: 150, variation: 25 },
        temperature: { target: 45, variation: 12 },
        frequency: { target: 50, variation: 0.2 }
      };

      const config = baseValues[metric];
      
      // Stock market-like movements
      const trend = Math.sin(Date.now() / 15000) * config.variation * 0.4;
      const volatility = (Math.random() - 0.5) * config.variation * 0.6;
      const momentum = (lastValue - config.target) * 0.1;
      
      const newValue = config.target + trend + volatility + momentum;
      lastValue = newValue;

      callback({
        value: Number(newValue.toFixed(2)),
        timestamp: new Date(),
        isRealTime: true,
        trend: newValue > lastValue ? 'up' : 'down'
      });
    }, intervals[metric]);
  },

  // Get historical data from backend
  getHistoricalData: async (metric, timeRange) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const points = {
      '15m': 90,
      '1h': 120,
      '6h': 144,
      '24h': 288
    };

    const data = [];
    const now = Date.now();
    const interval = (now - (timeRange === '15m' ? 15 * 60 * 1000 : 
                           timeRange === '1h' ? 60 * 60 * 1000 :
                           timeRange === '6h' ? 6 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)) / points[timeRange];

    const baseValues = {
      voltage: { target: 230, variation: 8 },
      current: { target: 150, variation: 25 },
      temperature: { target: 45, variation: 12 },
      frequency: { target: 50, variation: 0.2 }
    };

    const config = baseValues[metric];
    let lastValue = config.target;

    for (let i = 0; i < points[timeRange]; i++) {
      const timestamp = new Date(now - (points[timeRange] - i - 1) * interval);
      
      // Stock-like price movement
      const trend = Math.sin(i * 0.05) * config.variation * 0.5;
      const volatility = (Math.random() - 0.5) * config.variation * 0.4;
      const momentum = (lastValue - config.target) * 0.05;
      
      const value = config.target + trend + volatility + momentum;
      lastValue = value;

      data.push({
        value: Number(value.toFixed(2)),
        timestamp,
        time: timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isRealTime: false,
        trend: value > lastValue ? 'up' : 'down'
      });
    }

    return data;
  }
};

const TimeSeriesChart = () => {
  const [selectedMetric, setSelectedMetric] = useState('voltage');
  const [timeRange, setTimeRange] = useState('1h');
  const [isLive, setIsLive] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [mlInsights, setMlInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const metricOptions = [
    { value: 'voltage', label: 'Voltage', unit: 'kV', color: '#60A5FA' },
    { value: 'current', label: 'Current', unit: 'A', color: '#34D399' },
    { value: 'temperature', label: 'Temperature', unit: '°C', color: '#FBBF24' },
    { value: 'frequency', label: 'Frequency', unit: 'Hz', color: '#A78BFA' }
  ];

  const timeRangeOptions = [
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '6h', label: '6h' },
    { value: '24h', label: '24h' }
  ];

  // Initialize data and start streaming
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const historicalData = await MLBackendService.getHistoricalData(selectedMetric, timeRange);
        setChartData(historicalData);
        
        const insights = MLBackendService.predictAnomaly(historicalData, selectedMetric);
        setMlInsights(insights);
        
        if (isLive) {
          startRealTimeStream();
        }
      } catch (error) {
        console.error('Failed to initialize data:', error);
        setConnectionStatus('disconnected');
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    return () => {
      if (streamRef.current) {
        clearInterval(streamRef.current);
      }
    };
  }, [selectedMetric, timeRange]);

  // Handle live mode changes
  useEffect(() => {
    if (isLive && !streamRef.current) {
      startRealTimeStream();
    } else if (!isLive && streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }
  }, [isLive]);

  // Draw stock market style chart
  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;
    
    const currentMetric = metricOptions.find(m => m.value === selectedMetric);
    const baseValues = {
      voltage: { target: 230 },
      current: { target: 150 },
      temperature: { target: 45 },
      frequency: { target: 50 }
    };
    const targetValue = baseValues[selectedMetric].target;

    // Draw grid lines
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    ctx.setLineDash([]);

    // Calculate points for the line
    const points = chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = height - ((point.value - minValue) / valueRange) * height * 0.8 - height * 0.1;
      return { x, y, value: point.value, trend: point.trend };
    });

    // Draw the main chart line
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        // Smooth curve using previous and next points for better stock chart look
        const prevPoint = points[index - 1];
        const nextPoint = points[index + 1] || point;
        
        const cp1x = prevPoint.x + (point.x - prevPoint.x) * 0.5;
        const cp1y = prevPoint.y;
        const cp2x = point.x - (point.x - prevPoint.x) * 0.5;
        const cp2y = point.y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
      }
    });

    // Gradient stroke based on trend
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    const overallTrend = points[points.length - 1].value > points[0].value;
    gradient.addColorStop(0, overallTrend ? '#10B981' : '#EF4444');
    gradient.addColorStop(1, overallTrend ? '#34D399' : '#F87171');
    
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Draw area under curve
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.closePath();
    
    const areaGradient = ctx.createLinearGradient(0, 0, 0, height);
    areaGradient.addColorStop(0, overallTrend ? '#10B98120' : '#EF444420');
    areaGradient.addColorStop(1, overallTrend ? '#10B98105' : '#EF444405');
    
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw target line
    ctx.beginPath();
    const targetY = height - ((targetValue - minValue) / valueRange) * height * 0.8 - height * 0.1;
    ctx.moveTo(0, targetY);
    ctx.lineTo(width, targetY);
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw current price indicator
    const lastPoint = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(lastPoint.x, lastPoint.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#1F2937';
    ctx.fill();
    ctx.strokeStyle = overallTrend ? '#10B981' : '#EF4444';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw volume bars (stock market style)
    ctx.fillStyle = '#4B5563';
    points.forEach((point, index) => {
      if (index % 3 === 0) { // Draw volume bars for every 3rd point
        const barHeight = (Math.random() * 20) + 5;
        const barWidth = 2;
        ctx.fillRect(point.x - barWidth/2, height - barHeight, barWidth, barHeight);
      }
    });

  }, [chartData, selectedMetric]);

  const startRealTimeStream = () => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
    }

    streamRef.current = MLBackendService.streamData(selectedMetric, (newDataPoint) => {
      setChartData(prev => {
        const newData = [...prev.slice(1), {
          ...newDataPoint,
          time: newDataPoint.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }];

        if (newData.length % 8 === 0) {
          const insights = MLBackendService.predictAnomaly(newData, selectedMetric);
          setMlInsights(insights);
        }

        return newData;
      });
    });

    setConnectionStatus('connected');
  };

  const currentMetric = metricOptions.find(m => m.value === selectedMetric);
  const currentValue = chartData[chartData.length - 1]?.value || 0;
  const previousValue = chartData[chartData.length - 2]?.value || currentValue;
  const change = currentValue - previousValue;
  const changePercent = ((change / previousValue) * 100).toFixed(2);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Smart Grid Analytics</h2>
            <p className="text-gray-400">Stock-style real-time monitoring</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
            connectionStatus === 'connected' 
              ? 'bg-green-900/30 border-green-700/50 text-green-400'
              : 'bg-red-900/30 border-red-700/50 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-sm font-medium">
              {connectionStatus === 'connected' ? 'Live' : 'Offline'}
            </span>
          </div>

          {/* ML Insights Badge */}
          {mlInsights && mlInsights.isAnomaly && (
            <div className="flex items-center space-x-2 bg-red-900/30 px-3 py-2 rounded-lg border border-red-700/50">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm font-medium">Alert</span>
            </div>
          )}

          {/* Metric Selector */}
          <div className="relative">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="appearance-none bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 pr-10 text-white font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
              disabled={isLoading}
            >
              {metricOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Time Range */}
          <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700">
            {timeRangeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === option.value
                    ? 'bg-gray-700 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white disabled:hover:text-gray-400'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Live Toggle */}
          <button
            onClick={() => setIsLive(!isLive)}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all ${
              isLive
                ? 'bg-red-900/30 text-red-400 hover:bg-red-900/40 border border-red-700/50'
                : 'bg-green-900/30 text-green-400 hover:bg-green-900/40 border border-green-700/50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLive ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6">
        {/* Current Value and Price Change */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">
                {currentValue}
                <span className="text-xl text-gray-400 ml-1">{currentMetric.unit}</span>
              </div>
              <div className="text-gray-400 mt-1">{currentMetric.label}</div>
            </div>
            
            <div className="h-12 w-px bg-gray-700"></div>
            
            {/* Price Change */}
            <div className="space-y-1">
              <div className={`flex items-center space-x-2 text-lg font-semibold ${
                change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{change >= 0 ? '↗' : '↘'}</span>
                <span>{change >= 0 ? '+' : ''}{change.toFixed(2)}</span>
                <span>({changePercent}%)</span>
              </div>
              <div className="text-sm text-gray-400">Since last update</div>
            </div>

            {/* ML Insights */}
            {mlInsights && (
              <div className="space-y-1">
                <div className={`flex items-center space-x-2 text-sm ${
                  mlInsights.isAnomaly ? 'text-red-400' : 'text-green-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    mlInsights.isAnomaly ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium">{mlInsights.message}</span>
                </div>
                <div className="text-xs text-gray-400">
                  ML Confidence: {mlInsights.confidence}%
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-400">Last update</div>
            <div className="text-lg font-semibold text-white">
              {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true 
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {chartData.length} points • {isLive ? 'Streaming' : 'Paused'}
            </div>
          </div>
        </div>

        {/* Stock Market Style Canvas Chart */}
        <div className="relative h-80 bg-gray-800 rounded-xl border border-gray-700 p-4">
          <canvas
            ref={canvasRef}
            width={1200}
            height={400}
            className="w-full h-full"
          />
          
          {/* Y-axis price labels */}
          <div className="absolute left-2 top-2 bottom-2 flex flex-col justify-between text-xs text-gray-400">
            <span>{Math.max(...chartData.map(d => d.value)).toFixed(1)}</span>
            <span>{currentMetric.unit}</span>
            <span>{Math.min(...chartData.map(d => d.value)).toFixed(1)}</span>
          </div>

          {/* Current price line */}
          {isLive && (
            <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600">
              <div className="text-sm text-gray-400">Current</div>
              <div className="text-lg font-bold text-white">
                {currentValue} {currentMetric.unit}
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Range: {Math.min(...chartData.map(d => d.value)).toFixed(1)} - {Math.max(...chartData.map(d => d.value)).toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Volatility: {Math.abs(changePercent)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>AI Monitoring: Active</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all font-medium border border-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-all font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Analyze</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;