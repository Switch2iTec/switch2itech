import React, { useState } from "react";
import { Send, Layout, Tag, AlignLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Addproject = () => {
  const [project, setProject] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Submitted:", project);
    setProject({ title: "", category: "", description: "" });
  };

  return (
    <div className="w-full bg-background transition-colors duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          Create New Project
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Fill in the details below to initialize your new project workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Layout size={16} className="text-primary" />
            Project Title
          </Label>
          <Input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="bg-muted/30 border-border text-foreground focus-visible:ring-primary/20"
            placeholder="e.g. E-commerce Dashboard"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Tag size={16} className="text-primary" />
            Category
          </Label>
          <select
            name="category"
            value={project.category}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
            required
          >
            <option value="" disabled className="bg-card">Select a category</option>
            <option value="Web Development" className="bg-card">Web Development</option>
            <option value="Mobile App" className="bg-card">Mobile App</option>
            <option value="UI/UX Design" className="bg-card">UI/UX Design</option>
            <option value="Branding" className="bg-card">Branding</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <AlignLeft size={16} className="text-primary" />
            Description
          </Label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="flex min-h-[80px] w-full rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all resize-none"
            placeholder="Describe the project scope and objectives..."
            rows={4}
            required
          ></textarea>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <Button
            type="submit"
            className="flex-1 py-6 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Publish Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Addproject;