import React from 'react'

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Anomaly Detection</h1>
        <p className="text-gray-300">Alert management center for substation anomalies</p>
      </div>
      
      <div className="glass rounded-xl p-6">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-300">Anomaly Detection Center</h3>
          <p className="text-gray-500 mt-2">AI/ML powered anomaly detection system</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics