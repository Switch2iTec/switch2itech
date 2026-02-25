import { useState } from "react";
import {
  Star,
  Check,
  Shield,
  Zap,
  Users,
  BarChart,
  Lock,
  Plus,
  ArrowLeft,
  ShoppingCart,
  Download
} from "lucide-react";
import { ProductGallery } from "./ProductGallery";
import { FeatureCard } from "./FeatureCard";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  const handleBack = () => {
    window.location.href = "/products"; 
  };

  const productImages = [
    "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRhc2hib2FyZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzE2NDE0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1663153206192-6d0e4c9570dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMHNjcmVlbnNob3R8ZW58MXx8fHwxNzcxNjk3NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1660145177383-e6e2c22adb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd29ya3NwYWNlJTIwcHJvZHVjdGl2aXR5fGVufDF8fHx8MTc3MTY5NzU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized performance ensures smooth and responsive experience." },
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and protocols to keep your data safe." },
    { icon: Users, title: "Team Collaboration", description: "Work seamlessly with your team in real-time." },
    { icon: BarChart, title: "Advanced Analytics", description: "Gain insights with comprehensive reporting features." },
    { icon: Lock, title: "Privacy First", description: "Your data stays yours. We never share your information." },
    { icon: Download, title: "Offline Access", description: "Access your work anywhere, anytime with full offline support." },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      role: "Product Manager",
      rating: 5,
      comment: "This has completely transformed how our team works. The collaboration features are outstanding.",
      date: "Feb 15, 2026",
    },
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      role: "Software Engineer",
      rating: 5,
      comment: "As a developer, I appreciate the attention to detail. The offline mode is a game-changer.",
      date: "Feb 10, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="relative z-10 w-full border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <h1 className="text-xl font-bold tracking-tight">Lumina Finance</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-20 grid gap-12 lg:grid-cols-2">
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm h-fit">
            <ProductGallery images={productImages} />
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                Best Seller
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm font-semibold">4.9</span>
                <span className="text-xs text-muted-foreground">(2,847 reviews)</span>
              </div>
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight mb-4 lg:text-5xl">
              ProWorkflow Suite
            </h2>

            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              The ultimate productivity platform for modern teams. Streamline
              your workflow, collaborate in real-time, and boost your team's
              efficiency with enterprise-grade tools.
            </p>

            <div className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-6 flex items-baseline gap-3">
                <span className="text-xl text-muted-foreground line-through decoration-primary/40">$299</span>
                <span className="text-4xl font-bold text-foreground">$199</span>
                <span className="rounded-lg bg-destructive/10 px-3 py-1 text-sm font-bold text-destructive border border-destructive/20">
                  Save $100
                </span>
              </div>

              <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Lifetime access", "Free updates", "Priority support", "30-day guarantee"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm font-medium">
                    <div className="rounded-full bg-primary/20 p-1">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1 rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                >
                  <option value={1}>1 License - $199</option>
                  <option value={5}>5 Licenses - $899</option>
                  <option value={10}>10 Licenses - $1,599</option>
                </select>

                <button className="flex-[1.5] flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 font-bold text-primary-foreground shadow transition-transform hover:scale-[1.02] active:scale-[0.98]">
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm font-medium text-foreground">
                Limited Time Offer: Get 33% off before Feb 28, 2026
              </p>
            </div>
          </div>
        </div>

        <section className="mb-24 py-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Everything you need to supercharge your productivity in one place.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Customer Reviews</h2>
              <p className="text-muted-foreground">
                See what our customers are saying about ProWorkflow Suite
              </p>
            </div>
            <button
              onClick={() => setReviewFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm hover:bg-secondary/80 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Write a Review
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        <ReviewForm open={reviewFormOpen} onOpenChange={setReviewFormOpen} />
      </main>
    </div>
  );
}