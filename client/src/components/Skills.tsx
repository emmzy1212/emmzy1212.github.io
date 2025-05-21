import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SkillProps {
  icon: string;
  name: string;
  description: string;
  percentage: number;
  color: string;
}

const skills: SkillProps[] = [
  {
    icon: "fab fa-html5",
    name: "HTML",
    description: "Semantic HTML5 markup, accessibility best practices, and structured content.",
    percentage: 95,
    color: "bg-orange-500"
  },
  {
    icon: "fab fa-css3-alt",
    name: "CSS",
    description: "Modern CSS techniques, animations, flexbox, grid, and responsive design.",
    percentage: 90,
    color: "bg-blue-500"
  },
  {
    icon: "fab fa-bootstrap",
    name: "Bootstrap",
    description: "Component customization, responsive layouts, and utility implementation.",
    percentage: 85,
    color: "bg-purple-600"
  },
  {
    icon: "fab fa-js",
    name: "JavaScript",
    description: "ES6+, DOM manipulation, asynchronous programming, and modern patterns.",
    percentage: 80,
    color: "bg-yellow-400"
  },
  {
    icon: "fab fa-react",
    name: "React",
    description: "Component-based architecture, hooks, state management, and React Router.",
    percentage: 75,
    color: "bg-cyan-500"
  },
  {
    icon: "fab fa-node-js",
    name: "Node.js",
    description: "Server-side JavaScript, RESTful APIs, middleware, and package management.",
    percentage: 70,
    color: "bg-green-600"
  },
  {
    icon: "fas fa-server",
    name: "Express",
    description: "API development, routing, middleware integration, and server configuration.",
    percentage: 65,
    color: "bg-gray-700"
  },
  {
    icon: "fas fa-database",
    name: "MongoDB",
    description: "NoSQL database design, schema modeling, and data operations with Mongoose.",
    percentage: 60,
    color: "bg-green-500"
  },
  {
    icon: "fab fa-git-alt",
    name: "Git",
    description: "Version control, branching strategies, collaboration, and GitHub workflow.",
    percentage: 75,
    color: "bg-orange-600"
  }
];

const SkillCard = ({ skill }: { skill: SkillProps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <i className={`${skill.icon} text-4xl text-${skill.color.split('-')[1]} mr-4`}></i>
        <h3 className="text-xl font-semibold">{skill.name}</h3>
      </div>
      <p className="text-slate-600 mb-4">
        {skill.description}
      </p>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
          className={`${skill.color} h-2.5 rounded-full skill-bar`} 
          style={{ width: isVisible ? `${skill.percentage}%` : '0%', transition: 'width 1s ease-in-out' }}
        ></div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">My Skills</h2>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            I've developed expertise in various technologies for creating modern web applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
