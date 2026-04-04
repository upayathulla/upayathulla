import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Briefcase, Award, Terminal } from 'lucide-react';

const MISSIONS = [
  { id: 1, title: 'SENIOR_CORE_ARCHITECT', company: 'GALACTIC_SOLUTIONS', period: '2055 - PRESENT', location: 'ORBIT_HUB_X', description: 'Leading frontend architecture for multi-planetary communication networks. Scaling reach to 5M+ users.', color: '#38BDF8' },
  { id: 2, title: 'SYSTEMS_OPERATOR_L2', company: 'NEBULA_SOFT', period: '2052 - 2055', location: 'ASTEROID_BELT', description: 'Developed high-performance visualization systems for deep-space mining telemetry.', color: '#8B5CF6' },
  { id: 3, title: 'JUNIOR_INTERFACE_PILOT', company: 'VOID_APPS', period: '2050 - 2052', location: 'EARTH_STATION', description: 'Full-stack development of secure data portals for interplanetary trade unions.', color: '#FACC15' },
];

export default function ExperienceUI({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
    >
      <div className="glass-morphism p-10 rounded-glass border border-accent-yellow/20 shadow-[0_0_50px_rgba(250,204,21,0.15)] relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-accent-yellow/10 rounded-2xl border border-accent-yellow/20">
                <Briefcase size={24} className="text-accent-yellow" />
            </div>
            <div>
                <h2 className="text-3xl font-heading text-white tracking-widest leading-none">MISSION_LOG</h2>
                <p className="text-xs font-mono text-accent-yellow/90 uppercase tracking-[0.3em] mt-2 font-bold italic">CAREER_TRAJECTORY_STABLE</p>
            </div>
        </div>

        <div className="relative border-l border-white/5 pl-8 space-y-12">
            {MISSIONS.map((mission, i) => (
                <motion.div 
                    key={mission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative group"
                >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full glass-morphism border border-white/10 flex items-center justify-center p-1 group-hover:scale-125 transition-transform duration-500">
                         <div className="w-full h-full rounded-full bg-accent-yellow shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    </div>

                    <div className="flex items-center gap-4 mb-2 text-white/70 text-xs font-heading tracking-widest uppercase">
                         <span className="flex items-center gap-1"><Calendar size={12} /> {mission.period}</span>
                         <span className="flex items-center gap-1"><MapPin size={12} /> {mission.location}</span>
                    </div>

                    <h3 className="text-xl font-heading text-white mb-2 leading-none group-hover:text-accent-yellow transition-colors group-hover:tracking-wider">{mission.title}</h3>
                    <p className="text-sm font-heading text-accent-yellow/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                         {mission.company} <div className="w-1.5 h-1.5 rounded-full bg-white/40" /> MISSION_STATUS: COMPLETE
                    </p>
                    <p className="text-sm font-light text-text-main/80 leading-relaxed font-sans">{mission.description}</p>
                    
                    {/* Status signals */}
                    <div className="flex gap-2 mt-6">
                        {['CORE', 'L3', 'STABLE'].map(tag => (
                            <span key={tag} className="px-2 py-1 text-[10px] font-mono bg-white/10 border border-white/20 hover:border-accent-yellow/40 rounded uppercase text-white/70 hover:text-white transition-all">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Dynamic scanner line decor */}
        <div className="absolute top-0 right-10 w-px h-full bg-linear-to-b from-transparent via-accent-yellow/20 to-transparent opacity-30" />
      </div>
    </motion.div>
  );
}
