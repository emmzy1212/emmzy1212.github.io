import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { useEffect } from "react";
import api from "@/lib/api";

const Home = () => {
  // Set up query with shorter stale time and refetch interval to keep projects fresh
  const { data: projects, isLoading, error, refetch } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: api.projects.getAll,
    staleTime: 1000, // Consider data stale after 1 second
    refetchInterval: 2000, // Refetch every 2 seconds when component is visible
  });
  
  // Refetch on mount and when returning to this page
  useEffect(() => {
    refetch();
    
    // Also set up a visibility change handler to refetch when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refetch();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refetch]);

  return (
    <div className="font-inter text-slate-800 bg-gray-50">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio 
        projects={projects || []} 
        isLoading={isLoading} 
        error={error ? (error as Error).message : null} 
      />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
