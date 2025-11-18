import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pagelayout/Homepage/Homepage'
import Dashboard from './Pagelayout/Dashboard/Dashboard'
import Monitoring from './Pagelayout/Monitoring/Monitoring'
import Analytics from './Pagelayout/Analytics/Analytics'
import Visualization from './Pagelayout/Visualization/Visualization'
import Simulation from './Pagelayout/Simulation/Simulation'
import Topology from './Pagelayout/Topology/Topology'
import Settings from './Pagelayout/Settings/Settings'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="visualization" element={<Visualization />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="topology" element={<Topology />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App