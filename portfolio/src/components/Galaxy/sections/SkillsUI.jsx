import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Database, Cpu, Layout, Layers, Terminal } from 'lucide-react';

const SKILL_GROUPS = [
  { id: 'frontend', name: 'FRONTEND_ENGINE', icon: <Layout size={18} />, skills: ['React', 'Next.js', 'Vite', 'Three.js', 'Framer Motion'] },
  { id: 'styling', name: 'VISUAL_INTERFACE', icon: <Layers size={18} />, skills: ['Tailwind', 'SCSS', 'PostCSS', 'CSS3', 'GLSL'] },
  { id: 'devops', name: 'CORE_LOGIC', icon: <Terminal size={18} />, skills: ['Node.js', 'TypeScript', 'GraphQL', 'Redux', 'Zustand'] },
];

export default function SkillsUI({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      className="fixed left-10 top-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
    >
      <div className="glass-morphism p-10 rounded-glass border border-secondary/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-secondary/10 rounded-2xl border border-secondary/20">
                <Cpu size={24} className="text-secondary" />
            </div>
            <div>
                <h2 className="text-3xl font-heading text-white tracking-widest leading-none">SKILL_ENGINE</h2>
                <p className="text-[10px] font-mono text-secondary uppercase tracking-[0.3em] mt-2 font-bold">MULTIPLE_MODULES_LOADED</p>
            </div>
        </div>

        <div className="space-y-8">
            {SKILL_GROUPS.map((group, i) => (
                <motion.div 
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="text-secondary opacity-60">{group.icon}</div>
                        <h3 className="text-xs font-heading text-white/60 tracking-[0.2em]">{group.name}</h3>
                        <div className="flex-1 h-px bg-white/5 mx-2" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {group.skills.map(skill => (
                            <div 
                                key={skill}
                                className="px-4 py-2 glass-morphism rounded-full text-[10px] font-mono text-white/80 border border-white/5 hover:border-secondary/40 hover:text-secondary hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all cursor-crosshair active:scale-95"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Dynamic decorative line */}
        <div className="absolute bottom-4 left-0 w-full h-1 overflow-hidden opacity-20">
            <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-linear-to-r from-transparent via-secondary to-transparent"
            />
        </div>
      </div>
    </motion.div>
  );
}
