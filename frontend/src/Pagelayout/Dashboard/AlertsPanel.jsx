import React, { useState } from 'react'

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      severity: 'critical',
      title: 'High Temperature Alert',
      description: 'Transformer T1 temperature exceeds safe operating limits',
      equipment: 'Transformer T1',
      timestamp: new Date(Date.now() - 300000),
      acknowledged: false,
      location: 'Bay 3'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Voltage Fluctuation',
      description: 'Bus voltage showing irregular patterns in 220kV section',
      equipment: 'Bus B2',
      timestamp: new Date(Date.now() - 900000),
      acknowledged: false,
      location: 'Bay 2'
    },
    {
      id: 3,
      severity: 'info',
      title: 'Maintenance Schedule',
      description: 'Scheduled maintenance for Circuit Breaker CB-5 in 2 hours',
      equipment: 'Circuit Breaker CB-5',
      timestamp: new Date(Date.now() - 1800000),
      acknowledged: true,
      location: 'Bay 5'
    }
  ])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-500/10 text-red-400'
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/10 text-yellow-400'
      case 'info': return 'border-l-blue-500 bg-blue-500/10 text-blue-400'
      default: return 'border-l-gray-500 bg-gray-500/10 text-gray-400'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🔴'
      case 'warning': return '🟡'
      case 'info': return '🔵'
      default: return '⚪'
    }
  }

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = Math.floor((now - timestamp) / 1000)
    
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    return `${Math.floor(diff / 3600)}h ago`
  }

  const activeAlerts = alerts.filter(alert => !alert.acknowledged)
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged)

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-lg">🔔</span>
          <h2 className="text-lg font-semibold text-white">System Alerts</h2>
          {activeAlerts.length > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
              {activeAlerts.length}
            </span>
          )}
        </div>
        <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2 text-sm">
          <span>⚙️</span>
          <span>Configure</span>
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activeAlerts.length === 0 && acknowledgedAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <span className="text-4xl text-green-400 mb-4">✅</span>
            <h3 className="text-lg font-medium text-white mb-2">All Clear</h3>
            <p className="text-sm text-gray-400">No active alerts in the system</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {/* Active Alerts */}
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`
                  border border-gray-700 rounded-lg p-3 border-l-4 transition-all duration-200
                  ${getSeverityColor(alert.severity)}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-lg mt-0.5">{getSeverityIcon(alert.severity)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-white truncate">
                          {alert.title}
                        </h4>
                        <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded">
                          {alert.location}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-400">
                          <span className="flex items-center space-x-1">
                            <span>🔧</span>
                            <span>{alert.equipment}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>🕒</span>
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs flex items-center space-x-1"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            <span>✓</span>
                            <span>Ack</span>
                          </button>
                          <button className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs">
                            <span>🔗</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Acknowledged Alerts */}
            {acknowledgedAlerts.length > 0 && (
              <>
                <div className="flex items-center space-x-2 px-2 py-3">
                  <div className="flex-1 h-px bg-gray-700" />
                  <span className="text-xs text-gray-400 font-medium">Acknowledged</span>
                  <div className="flex-1 h-px bg-gray-700" />
                </div>
                {acknowledgedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="border border-gray-700 rounded-lg p-3 bg-gray-700/30 opacity-60"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400">✅</span>
                        <div>
                          <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{alert.equipment}</span>
                            <span>•</span>
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-600 rounded text-gray-400">
                        <span>⋯</span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertsPanel