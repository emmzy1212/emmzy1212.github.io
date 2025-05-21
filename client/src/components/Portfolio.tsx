import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import ProjectCard from "./ProjectCard";
import { type Project } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioProps {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const Portfolio = ({ projects, isLoading, error }: PortfolioProps) => {
  const [filter, setFilter] = useState("all");
  const [, navigate] = useLocation();

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">My Portfolio</h2>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Discover creative solutions for your brand with my portfolio of work
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              type="button" 
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-sm font-medium rounded-l-lg ${
                filter === "all" 
                  ? "text-white bg-primary" 
                  : "text-slate-700 bg-white border border-gray-200"
              }`} 
            >
              All
            </button>
            <button 
              type="button" 
              onClick={() => setFilter("website")}
              className={`px-5 py-2 text-sm font-medium ${
                filter === "website" 
                  ? "text-white bg-primary" 
                  : "text-slate-700 bg-white border border-gray-200"
              }`}
            >
              Websites
            </button>
            <button 
              type="button" 
              onClick={() => setFilter("ecommerce")}
              className={`px-5 py-2 text-sm font-medium rounded-r-lg ${
                filter === "ecommerce" 
                  ? "text-white bg-primary" 
                  : "text-slate-700 bg-white border border-gray-200"
              }`}
            >
              E-commerce
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={{
                    ...project,
                    // Ensure we always have a valid image URL by providing backup images
                    imageUrl: project.imageUrl || "https://i.ibb.co/3NYQ4RP/food-preview.jpg"
                  }} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Add New Project Button */}
        <motion.div 
          className="mt-12 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => navigate("/add-project")}
            className="px-6 py-6 bg-[#f59e0b] text-white font-medium rounded-lg hover:bg-amber-600 transition shadow-md h-auto"
          >
            <i className="fas fa-plus mr-2"></i> Add New Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
