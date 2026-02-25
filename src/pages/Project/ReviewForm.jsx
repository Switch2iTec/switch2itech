import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Star, MessageSquarePlus, User, Briefcase, Zap } from "lucide-react";

export function ReviewForm({ open, onOpenChange }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, role, rating, comment });
    setName("");
    setRole("");
    setRating(0);
    setComment("");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* CNN Style Glass Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/40 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[90vh] w-[95vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-[2.5rem] border border-white/20 bg-card/80 backdrop-blur-2xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] p-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          
          {/* Header Section */}
          <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                    <MessageSquarePlus size={20} />
                  </div>
                  <Dialog.Title className="text-2xl font-black tracking-tighter uppercase">Feedback Intelligence</Dialog.Title>
                </div>
                <p className="text-blue-100/70 text-[10px] font-black uppercase tracking-[0.2em]">Deployment Phase 4.0</p>
              </div>
              <Dialog.Close className="rounded-full p-2 hover:bg-white/10 transition-all border border-white/20">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <User size={12} className="text-blue-500" /> Identity
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-secondary/30 border border-border/50 rounded-2xl px-4 py-3 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="Full name"
                />
              </div>

              {/* Role Input */}
              <div className="space-y-2">
                <label htmlFor="role" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Briefcase size={12} className="text-blue-500" /> Designation
                </label>
                <input
                  type="text"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full bg-secondary/30 border border-border/50 rounded-2xl px-4 py-3 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Lead Engineer"
                />
              </div>
            </div>

            {/* Rating Section */}
            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
              <label className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 block">Performance Metric</label>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="group"
                    >
                      <Star
                        className={`h-9 w-9 transition-all duration-300 ${
                          star <= (hoveredRating || rating)
                            ? "fill-blue-600 text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)] scale-110"
                            : "text-muted-foreground/30 group-hover:text-blue-300"
                        }`}
                        strokeWidth={star <= (hoveredRating || rating) ? 0 : 1.5}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-right">
                   <span className="text-3xl font-black tracking-tighter text-blue-600">{rating || 0}.0</span>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">System Score</p>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label htmlFor="comment" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Zap size={12} className="text-blue-500" /> Qualitative Analysis
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full bg-secondary/30 border border-border/50 rounded-[2rem] px-5 py-4 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="Submit your detailed experience report..."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={rating === 0}
                className="flex-[2] rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-white transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
              >
                Broadcast Review
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="flex-1 rounded-2xl border border-border/60 px-8 py-4 text-sm font-black uppercase tracking-[0.15em] text-muted-foreground transition-all hover:bg-secondary"
                >
                  Discard
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}