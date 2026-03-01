import React, { useState } from "react";
import testimonialService from "../../api/testimonialService";
import {
  X,
  Star,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

export function ReviewForm({ open, onOpenChange, productId, projectId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    authorNameOverride: "",
    authorRoleOverride: "",
    authorCompanyOverride: "",
    title: "",
    content: "",
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await testimonialService.createTestimonial({
        ...formData,
        rating,
        product: productId,
        project: projectId,
      });
      setSuccess(true);
      showToast("Testimonial transmitted successfully");
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      showToast("Transmission failed. System error.", "error");
    } finally {
      setLoading(false);
    }
  };

  const ToastUI = () => (
    toast.show && (
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3 px-6 py-3 border rounded-full shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-md ${
        toast.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-200' : 'bg-blue-600/20 border-blue-500/50 text-blue-100'
      }`}>
        {toast.type === 'error' ? <XCircle size={16} /> : <Info size={16} />}
        <span className="text-xs font-bold uppercase tracking-widest">{toast.message}</span>
      </div>
    )
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <ToastUI />
      
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1115] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header: Solid & Clean */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight uppercase italic">
                Submit Review
              </h2>
              <p className="text-[10px] opacity-70 tracking-widest uppercase">
                System Integrity Check
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center p-20 text-center animate-in fade-in">
            <CheckCircle size={60} className="mb-4 text-green-500" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Report Logged</h3>
            <p className="text-xs text-gray-500 mt-2 uppercase">Securing data in mainframe...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Identity Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Name
                </label>
                <input
                  className="w-full rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
                  name="authorNameOverride"
                  autoComplete="off"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      authorNameOverride: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Role
                </label>
                <input
                  className="w-full rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
                  name="authorRoleOverride"
                  autoComplete="off"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      authorRoleOverride: e.target.value,
                    })
                  }
                  placeholder="CTO"
                />
              </div>
            </div>

            {/* Rating Section */}
            <div className="rounded-2xl bg-white/5 p-4 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                Rating Score
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={24}
                    onClick={() => {
                      setRating(s);
                      showToast(`Rating set to ${s} stars`);
                    }}
                    onMouseEnter={() => setHovered(s)}
                    onMouseLeave={() => setHovered(0)}
                    className={`cursor-pointer transition-all ${s <= (hovered || rating) ? "fill-blue-500 text-blue-500 scale-110" : "text-gray-600"}`}
                  />
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Your Experience
              </label>
              <textarea
                rows={4}
                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-500 transition-all resize-none"
                name="content"
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="How was the project delivery?"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-blue-600 py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                <span>Send Testimonial</span>
              </div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}