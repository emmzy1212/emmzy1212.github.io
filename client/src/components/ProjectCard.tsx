import { motion } from "framer-motion";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-lg shadow-lg h-64" 
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
        onError={(e) => {
          // Set a proper fallback image if the project image fails to load
          const target = e.target as HTMLImageElement;
          // Use a different image based on project type to make it look nice
          if (project.category === 'website') {
            target.src = "https://i.ibb.co/58gHkjF/website-preview.jpg";
          } else if (project.category === 'ecommerce') {
            target.src = "https://i.ibb.co/yQNfnHb/ecommerce-preview.jpg";
          } else {
            target.src = "https://i.ibb.co/M5nGpfC/art-preview.jpg";
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 transition duration-300 flex flex-col justify-end p-6 group-hover:opacity-100">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-gray-300 mt-1">{project.description}</p>
        <div className="mt-4 flex space-x-3">
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 bg-white text-primary rounded-md font-medium hover:bg-primary hover:text-white transition"
          >
            View Live
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
