import { motion } from "framer-motion";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 md:pr-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Hi, I'm <span className="text-primary">Afeez</span>
              <span className="block mt-2">Web Developer</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 md:max-w-md">
              Building responsive and performance-driven web applications with modern technologies.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a 
                href="#portfolio" 
                onClick={() => scrollToSection("portfolio")}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 bg-white text-primary font-medium rounded-lg border border-primary hover:bg-primary hover:text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="#" className="text-slate-600 hover:text-primary transition" aria-label="GitHub">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-600 hover:text-primary transition" aria-label="Telegram">
                <i className="fab fa-telegram text-xl"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 mt-10 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            <img 
              src="/uploads/profile/afeez-profile.jpg" 
              alt="Afeez - Web Developer" 
              className="w-full max-w-md mx-auto rounded-full shadow-xl border-4 border-white" 
              onError={(e) => {
                // Fallback to a backup image if the profile image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://i.ibb.co/JC4skS0/team-animate.jpg";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
