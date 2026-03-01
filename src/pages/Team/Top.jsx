import React, { useState } from 'react'
import { PlusCircle, UserPlus, Users, CheckCircle2, XCircle, X } from 'lucide-react'
import { Button } from '../../components/ui/button'

const Top = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const ToastUI = () => (
    toast.show && (
      <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 border rounded-xl shadow-2xl animate-in slide-in-from-right-10 fade-in duration-300 ${
        toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-card border-border text-foreground'
      }`}>
        {toast.type === 'error' ? <XCircle size={18} className="text-rose-500" /> : <CheckCircle2 size={18} className="text-primary" />}
        <span className="text-sm font-bold tracking-tight">{toast.message}</span>
        <button onClick={() => setToast({ ...toast, show: false })} className="ml-2 opacity-50 hover:opacity-100">
          <X size={14} />
        </button>
      </div>
    )
  );

  return (
    <div className="page-header relative">
      <ToastUI />
      <div>
        <h1 className="page-title flex items-center gap-2.5">
          <Users size={26} className="text-primary" /> Team Management
        </h1>
        <p className="page-subtitle">Create teams and assign members to manage projects effectively</p>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          className="rounded-xl gap-2"
          onClick={() => showToast("Opening member invitation...")}
        >
          <UserPlus size={15} /> Add Member
        </Button>
        <Button 
          className="rounded-xl gap-2 shadow-sm shadow-primary/20"
          onClick={() => showToast("Initializing team creation wizard")}
        >
          <PlusCircle size={15} /> Create Team
        </Button>
      </div>
    </div>
  )
}

export default Top