import React from 'react'
import Top from './Top'
import Main from './Main'
import Header from './Header'

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col pt-4 space-y-10">
        <Header />
        <Top />
        <Main />
      </div>
    </div>
  )
}

export default Testimonials