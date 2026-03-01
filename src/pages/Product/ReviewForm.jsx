import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import testimonialService from "../../api/testimonialService";

export function ReviewForm({ open, onOpenChange, productName, productId }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      showToast("Please select a rating score.", "error");
      return;
    }

    setLoading(true);
    try {
      await testimonialService.createTestimonial({
        authorNameOverride: name,
        authorRoleOverride: role,
        rating: rating,
        content: comment,
        product: productId
      });

      showToast("Review submitted for approval!");
      
      setName("");
      setRole("");
      setRating(0);
      setComment("");
      
      setTimeout(() => {
        onOpenChange(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to submit review", error);
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[110] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Toast Notification positioned inside Portal to stay on top of Modal */}
        {toast.show && (
          <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[130] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border animate-in slide-in-from-top-4 duration-300 ${
            toast.type === 'error' ? 'bg-red-50 border-red-200 text-white' : 'bg-white border-gray-100 text-gray-900'
          }`}>
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} className="text-green-500" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        )}

        <Dialog.Content className="fixed left-[50%] top-[50%] z-[120] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-white p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg">Write a Review</Dialog.Title>
            <Dialog.Close className="rounded-full p-1 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="mb-6 text-gray-600">
            Share your experience with ProWorkflow Suite to help others make
            informed decisions.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="role" className="mb-2 block text-sm font-medium">
                Your Role <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="e.g., Product Manager, Developer"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Rating <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      showToast(`Rated ${star} stars`);
                    }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>
              {rating === 0 && (
                <p className="mt-1 text-sm text-gray-500">Click to rate</p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                Your Review <span className="text-red-600">*</span>
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                placeholder="Tell us about your experience..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={rating === 0 || loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                Submit Review
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-lg border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}