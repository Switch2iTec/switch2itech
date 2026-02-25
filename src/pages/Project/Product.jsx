import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Plus, Code, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import Main from "./Main";

const DUMMY_DATA = [
  {
    _id: "1",
    name: "Nexus Cloud Infrastructure",
    category: "DevOps",
    desc: "A highly scalable cloud management dashboard designed for enterprise-level automation.",
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
    desc: "Next-generation digital wallet with biometric security and cross-border integration.",
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
    category: "AI",
    desc: "NLP engine capable of analyzing high-volume datasets for sentiment forecasting.",
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
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(DUMMY_DATA);
        }
      } catch (error) {
        setProducts(DUMMY_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        if (id.length > 5) { 
          await axios.delete(`${API_URL}/${id}`);
        }
        setProducts(products.filter((p) => p._id !== id));
        setSelectedProduct(null);
      } catch (error) {
        alert("Delete failed.");
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
    <div className="min-h-screen bg-background p-6 md:px-12 md:py-8 font-sans text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground text-sm font-medium">
              {filteredProducts.length} Active Repositories
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 py-2 bg-card border-border rounded-lg w-48 md:w-64 h-10"
              />
            </div>
            <Button className="h-10 px-4 rounded-lg font-bold">
              <Plus size={16} className="mr-2" strokeWidth={3} />
              New
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product._id}
              onClick={() => setSelectedProduct(product)}
              className="group bg-card border-border rounded-2xl overflow-hidden transition-all hover:shadow-md cursor-pointer"
            >
              <div className="relative h-32 w-full overflow-hidden bg-muted">
                <img
                  src={product.thumbnail || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-card/90 backdrop-blur px-2 py-0.5 rounded-md text-[9px] font-bold uppercase text-primary border border-white/10">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-1 mb-3">
                  {product.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.techStack?.slice(0, 3).map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-2 py-0 bg-muted/30 border-border rounded-md text-[9px] font-medium text-muted-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight">Progress</span>
                    <span className="text-[10px] font-bold text-primary">{product.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500" 
                      style={{ width: `${product.progress || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Stakeholder</span>
                    <span className="text-xs font-semibold text-foreground/80">{product.clients || "Internal"}</span>
                  </div>
                  <div className="h-8 w-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ExternalLink size={14} />
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