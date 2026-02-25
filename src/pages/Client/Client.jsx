import React from 'react'
import Top from './Top'
import Main from './Main'

const Client = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col pt-4">
        <Top />
        <div className="mt-10">
          <Main />
        </div>
      </div>
    </div>
  )
}

export default Client