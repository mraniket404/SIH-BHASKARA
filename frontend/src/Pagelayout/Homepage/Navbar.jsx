import React from 'react'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-navbar border-b border-navbar/20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center">
          <button
            className="lg:hidden text-white/80 hover:text-white focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold text-white">
              EHV 400/220 kV Substation Digital Twin
            </h1>
            <p className="text-sm text-white/80">Real-time Monitoring & Analytics</p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">Live</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-white/80 hover:text-white hover:bg-navbar/50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 010 11.25" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full"></span>
          </button>

          {/* User profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-highlight rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-navbar">OP</span>
            </div>
            <span className="text-sm text-white/80 hidden md:block">Operator</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar