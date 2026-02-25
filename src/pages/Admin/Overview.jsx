import React, { useState } from 'react'
import Top from './Top'
import Main from './Main'
import Bottom from './Bottom'

const Overview = () => {
  const [currentView, setCurrentView] = useState('overview')

  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      <Top currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <Main />
          <Bottom />
        </div>
      )}
    </div>
  )
}

export default Overview