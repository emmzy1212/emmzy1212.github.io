import { useState, useEffect } from "react";
import { Link } from "wouter";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Handle scroll to highlight active section in nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "portfolio", "contact"];
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // When the section is in view
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const getNavLinkClass = (sectionId: string) => {
    return sectionId === activeSection
      ? "text-primary font-medium hover:text-secondary transition"
      : "text-gray-500 font-medium hover:text-primary transition";
  };
  
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 font-bold text-2xl text-primary">
            <a href="#" onClick={() => scrollToSection("home")} className="flex items-center">
              <span className="text-secondary">A</span>feez
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              <i className="fa fa-bars text-xl"></i>
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" onClick={() => scrollToSection("home")} className={getNavLinkClass("home")}>Home</a>
            <a href="#about" onClick={() => scrollToSection("about")} className={getNavLinkClass("about")}>About</a>
            <a href="#skills" onClick={() => scrollToSection("skills")} className={getNavLinkClass("skills")}>Skills</a>
            <a href="#portfolio" onClick={() => scrollToSection("portfolio")} className={getNavLinkClass("portfolio")}>Portfolio</a>
            <a href="#contact" onClick={() => scrollToSection("contact")} className={getNavLinkClass("contact")}>Contact</a>
          </nav>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white border-t border-gray-200 animate-fade-in ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#home" onClick={() => scrollToSection("home")} className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === "home" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>Home</a>
          <a href="#about" onClick={() => scrollToSection("about")} className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === "about" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>About</a>
          <a href="#skills" onClick={() => scrollToSection("skills")} className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === "skills" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>Skills</a>
          <a href="#portfolio" onClick={() => scrollToSection("portfolio")} className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === "portfolio" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>Portfolio</a>
          <a href="#contact" onClick={() => scrollToSection("contact")} className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === "contact" ? "text-primary" : "text-gray-500 hover:text-primary"}`}>Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
