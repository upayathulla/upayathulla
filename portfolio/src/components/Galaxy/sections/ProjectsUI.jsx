import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronRight, Zap, Target } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'NEBULA_ENGINE_V1', category: '3D GRAPHICS', description: 'Advanced WebGL renderer for cosmic simulations. Built with Three.js and GLSL.', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80', color: '#38BDF8', link: '#', repo: '#' },
  { id: 2, title: 'VOID_INTERFACE_X', category: 'UI FRAMEWORK', description: 'Minimalist glassmorphism component library for modern web apps. Zero-dependency.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', color: '#8B5CF6', link: '#', repo: '#' },
  { id: 3, title: 'QUANTUM_PORTAL', category: 'BLOCKCHAIN', description: 'Cross-chain bridging protocol with real-time transaction visualization.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', color: '#F472B6', link: '#', repo: '#' },
];

export default function ProjectsUI({ onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full max-w-7xl px-10 flex flex-col items-center pointer-events-auto">
        <div className="flex justify-between items-center w-full mb-12">
            <div>
                <h2 className="text-4xl font-heading text-white tracking-widest drop-shadow-md">PROJECT_REGISTRY</h2>
                <p className="text-[10px] font-mono text-primary/60 tracking-[0.4em] mt-2 font-bold italic uppercase">ACCESS_LEVEL_GRANTED</p>
            </div>
            <button 
                onClick={onClose}
                className="p-4 glass-morphism rounded-full hover:bg-white/10 transition-all text-white/40 hover:text-white border border-white/5"
            >
                <X size={24} />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {PROJECTS.map((project, i) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                    className="group"
                >
                    <div className="glass-morphism rounded-glass border border-white/10 overflow-hidden h-full flex flex-col group-hover:border-primary/40 transition-all duration-500 shadow-2xl relative">
                        {/* Status badge */}
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                             <span className="text-[8px] font-heading font-bold text-white tracking-widest uppercase">ACTIVE_UNIT</span>
                        </div>

                        <div className="relative h-48 overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100 blur-[2px] group-hover:blur-0" />
                            <div className="absolute inset-0 bg-linear-to-t from-bg-deep via-transparent to-transparent opacity-80" />
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <span className="text-[10px] font-heading text-primary/60 tracking-widest mb-2 block">{project.category}</span>
                            <h3 className="text-xl font-heading text-white mb-4 tracking-wider transition-colors group-hover:text-primary">{project.title}</h3>
                            <p className="text-sm font-light text-text-main/80 leading-relaxed mb-8 flex-1">{project.description}</p>
                            
                            <div className="flex items-center gap-4 mt-auto">
                                <a href={project.link} className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all border border-primary/20">
                                    <ExternalLink size={18} />
                                </a>
                                <a href={project.repo} className="p-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Github size={18} />
                                </a>
                                <button className="ml-auto flex items-center gap-2 text-[10px] font-heading font-black text-white/40 hover:text-primary transition-colors group/btn">
                                    MISSION_INTEL <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Interactive glow layer */}
                        <div className="absolute inset-0 z-[-1] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
                             style={{ background: `radial-gradient(circle at center, ${project.color}, transparent)` }} />
                    </div>
                </motion.div>
            ))}
        </div>
        
        {/* Pagination/Controls indicator */}
        <div className="mt-16 flex items-center gap-4">
             <div className="w-20 h-px bg-white/10" />
             <span className="text-[10px] font-mono text-white/20 tracking-[1em] uppercase">SYSTEM_ARCHIVE_01_EOF</span>
             <div className="w-20 h-px bg-white/10" />
        </div>
      </div>
    </motion.div>
  );
}
