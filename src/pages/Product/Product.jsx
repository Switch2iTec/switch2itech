import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Code, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import Main from "./Main";

// --- FALLBACK DUMMY DATA ---
const DUMMY_DATA = [
  {
    _id: "1",
    name: "Nexus Cloud Infrastructure",
    category: "DevOps",
    desc: "A highly scalable cloud management dashboard designed for enterprise-level automation and real-time monitoring.",
    techStack: ["React", "Node.js", "AWS", "Docker"],
    clients: "Global Tech Corp",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    progress: 95,
    deadline: "Dec 2025",
    status: "Active"
  },
  {
    _id: "2",
    name: "FinFlow Mobile Wallet",
    category: "FinTech",
    desc: "Next-generation digital wallet with biometric security and cross-border instant payment integration.",
    techStack: ["React Native", "Firebase", "Stripe API"],
    clients: "Silverline Banking",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
    progress: 88,
    deadline: "Feb 2026",
    status: "Under Review"
  },
  {
    _id: "3",
    name: "Aether AI Engine",
    category: "Artificial Intelligence",
    desc: "Natural Language Processing engine capable of analyzing high-volume datasets for sentiment and trend forecasting.",
    techStack: ["Python", "TensorFlow", "FastAPI"],
    clients: "DataSynthetix",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
    progress: 100,
    deadline: "Completed",
    status: "Deployed"
  }
];

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = "http://localhost:5000/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        // If API returns successfully, use that data
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(DUMMY_DATA);
        }
      } catch (error) {
        console.warn("API Unavailable. Rendering dummy data.");
        setProducts(DUMMY_DATA); // Fallback to dummy data on error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        // Only attempt API delete if it's not dummy data (IDs starting with number are dummy here)
        if (id.length > 5) { 
          await axios.delete(`${API_URL}/${id}`);
        }
        setProducts(products.filter((p) => p._id !== id));
        setSelectedProduct(null);
      } catch (error) {
        alert("Delete failed. Please try again.");
      }
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  if (selectedProduct) {
    return (
      <Main
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onDelete={() => handleDelete(selectedProduct._id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 font-sans text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Digital Inventory
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">
              Managing {filteredProducts.length} published assets
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search repository..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-6 bg-card border-border rounded-xl w-64 shadow-sm"
              />
            </div>
            <Button className="flex items-center gap-2 px-6 py-6 rounded-xl font-bold transition-all shadow-lg shadow-primary/10">
              <Plus size={18} strokeWidth={3} />
              New Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-card border-border rounded-3xl overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-52 w-full overflow-hidden bg-muted">
                <img
                  src={product.thumbnail || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-card/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-primary border border-white/20"
                  >
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-7">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
                  {product.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {product.techStack?.slice(0, 3).map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1.5 px-3 py-1 bg-muted/40 border-border rounded-lg text-[10px] font-bold text-muted-foreground uppercase"
                    >
                      <Code size={12} />
                      {tech}
                    </Badge>
                  ))}
                  {product.techStack?.length > 3 && (
                    <span className="text-[10px] font-bold text-muted-foreground/60 self-center">
                      +{product.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      Stakeholder
                    </span>
                    <span className="text-sm font-bold text-foreground/80">
                      {product.clients || "Internal"}
                    </span>
                  </div>
                  
                  <div className="h-10 w-10 bg-foreground text-background rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-md">
                    <ExternalLink size={18} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;