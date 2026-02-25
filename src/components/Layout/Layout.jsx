import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className="flex h-screen bg-background overflow-hidden transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout