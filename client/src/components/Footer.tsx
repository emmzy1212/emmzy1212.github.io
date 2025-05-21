const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Afeez<span className="text-primary">.</span></h2>
            <p className="text-slate-400 max-w-md">
              Creating beautiful, functional, and responsive web experiences with a focus on user-centered design and performance.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" onClick={() => scrollToSection("home")} className="text-slate-400 hover:text-primary transition">Home</a></li>
                <li><a href="#about" onClick={() => scrollToSection("about")} className="text-slate-400 hover:text-primary transition">About</a></li>
                <li><a href="#skills" onClick={() => scrollToSection("skills")} className="text-slate-400 hover:text-primary transition">Skills</a></li>
                <li><a href="#portfolio" onClick={() => scrollToSection("portfolio")} className="text-slate-400 hover:text-primary transition">Portfolio</a></li>
                <li><a href="#contact" onClick={() => scrollToSection("contact")} className="text-slate-400 hover:text-primary transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Web Design</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Frontend Development</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Backend Development</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Full Stack Development</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition">Frontend Training</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Afeez. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-primary transition" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-slate-400 hover:text-primary transition" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
