import { motion } from "framer-motion";

const About = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">About Me</h2>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-2/5 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/uploads/profile/afeez-profile.jpg" 
              alt="Afeez - Web Developer" 
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              onError={(e) => {
                // Fallback to a backup image if the profile image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://i.ibb.co/JC4skS0/team-animate.jpg";
              }}
            />
          </motion.div>
          
          <motion.div 
            className="md:w-3/5 md:pl-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-4">Web Designer & Developer</h3>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Hello! I'm Afeez, a creative web designer and developer from Lagos Island, Lagos State, Nigeria. I have rich experience in website design and development, creating responsive and user-friendly interfaces that leave a lasting impression.
            </p>
            <p className="text-slate-600 mb-4 leading-relaxed">
              I love to connect with others, learn, and share beneficial knowledge for future purposes. I'm passionate about both frontend and backend development, creating comprehensive web solutions that address client needs.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              I also offer frontend classes for beginners who want to learn coding and develop the skills necessary to work at any organization worldwide as a frontend developer.
            </p>
            
            <div className="grid grid-cols-2 gap-y-4 text-slate-700">
              <div>
                <span className="font-semibold">Name:</span> Afeez
              </div>
              <div>
                <span className="font-semibold">Location:</span> Lagos, Nigeria
              </div>
              <div>
                <span className="font-semibold">Email:</span> <a href="mailto:contact@afeez.dev" className="text-primary hover:underline">contact@afeez.dev</a>
              </div>
              <div>
                <span className="font-semibold">Available for:</span> Freelance
              </div>
            </div>
            
            <div className="mt-8">
              <motion.a 
                href="#contact" 
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
