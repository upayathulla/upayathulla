import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/portfolio-data";
import { ExternalLink, Database, Cpu, Layout, Eye } from "lucide-react";

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {projects.map((project, index) => (
        <motion.div
           key={index}
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: index * 0.1 }}
           className="tech-frame border-white/10 group cursor-pointer"
        >
           {/* Card Header Style - Like the technical labels in image */}
           <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-4">
                    <span className="w-10 h-1 bg-primary-red" />
                    <span className="text-xs font-black text-primary-red tracking-[0.4em] uppercase">Project_Log // 0{index + 1}</span>
                 </div>
                 <h3 className="font-tech text-3xl font-black text-white group-hover:text-primary-red transition-colors duration-500 uppercase">
                    {project.title}
                 </h3>
              </div>
              <div className="w-12 h-12 tech-frame flex items-center justify-center p-0 border-white/20 group-hover:border-primary-red transition-all">
                 <Layout size={20} className="text-white group-hover:text-primary-red" />
              </div>
           </div>

           {/* Badge - Match the red square style */}
           <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary-red text-white text-[10px] font-black px-3 py-1 uppercase italic tracking-widest">
                 {project.category}
              </span>
              <div className="h-px flex-1 bg-white/10" />
           </div>

           <p className="text-text-gray/90 text-sm leading-relaxed font-mono uppercase tracking-[0.1em] mb-10 h-24 overflow-hidden mask-fade-to-bottom">
              {project.description}
           </p>

           {/* Tech Stack List - Technical frames */}
           <div className="flex flex-wrap gap-4 mb-10">
              {project.tech.map((tech, tIdx) => (
                <div key={tIdx} className="border border-white/20 px-3 py-1 text-[10px] font-bold text-white/70 uppercase tracking-widest hover:border-primary-red hover:text-white transition-colors">
                   {tech}
                </div>
              ))}
           </div>

           <div className="flex justify-between items-center border-t border-white/5 pt-6">
              <div className="flex gap-2 text-text-gray/90 text-[10px] font-mono uppercase tracking-widest">
                 <span className="text-primary-red font-bold">Status:</span>
                 <span>Deployed_Ready</span>
              </div>
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-primary-red hover:border-primary-red text-[10px] font-black uppercase text-white transition-all duration-300"
              >
                Launch_Demo
                <ExternalLink size={12} />
              </a>
           </div>

           {/* Corner technical markers */}
           <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
              <div className="w-20 h-1 bg-white/5 rotate-45 translate-x-10 translate-y-[-10px]" />
           </div>
        </motion.div>
      ))}
    </div>
  );
}
