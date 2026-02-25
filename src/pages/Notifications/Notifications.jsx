import React from 'react'
import { Bell, Plus } from 'lucide-react'

const Notifications = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Announcements
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage system notifications and alerts.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-all cursor-pointer shadow-lg shadow-indigo-100 active:scale-95 w-fit">
          <Plus size={18} />
          New announcement
        </button>
      </div>

      <div className="border-t border-slate-200 w-full shrink-0"></div>

      <div className="flex-1 flex items-center justify-center min-h-0 px-6">
        <div className="max-w-md w-full border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center text-center bg-slate-50/50">
          <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
            <Bell size={32} className="text-slate-300" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-800">
            No announcements
          </h3>
          
          <p className="text-sm text-slate-500 mt-2">
            Create your first system notification below.
          </p>

          <button className="mt-6 text-indigo-600 font-bold text-sm hover:text-indigo-700 cursor-pointer flex items-center gap-1 group">
            <Plus size={16} className="group-hover:scale-110 transition-transform" />
            Click here to start
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notifications