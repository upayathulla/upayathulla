import React from 'react';
import { motion } from 'framer-motion';
import { X, User, Code, Globe, MessageSquare } from 'lucide-react';

export default function AboutUI({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: 100 }}
      className="fixed right-10 top-1/2 -translate-y-1/2 z-50 w-full max-w-md"
    >
      <div className="glass-morphism p-8 rounded-glass border border-primary/20 shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                <User size={24} className="text-primary" />
            </div>
            <div>
                <h2 className="text-2xl font-heading text-white tracking-widest">ABOUT_ME</h2>
                <p className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">IDENTITY_VERIFIED</p>
            </div>
        </div>

        <div className="space-y-6">
            <p className="text-text-main leading-relaxed text-sm font-light">
                I am a <span className="text-primary font-bold">UI Frontend Developer</span> with a passion for building immersive, interactive, and visually stunning digital experiences. 
            </p>
            
            <p className="text-text-main leading-relaxed text-sm font-light">
                Currently exploring the intersection of <span className="text-secondary font-bold">3D Web Graphics</span> and <span className="text-accent-pink font-bold">Motion Design</span>. I believe the web should feel alive, not just functional.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 glass-morphism rounded-xl border border-white/5">
                    <div className="text-primary mb-2"><Code size={18} /></div>
                    <div className="text-[10px] font-heading text-white/40 mb-1">CRAFT</div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Frontend Dev</div>
                </div>
                <div className="p-4 glass-morphism rounded-xl border border-white/5">
                    <div className="text-secondary mb-2"><Globe size={18} /></div>
                    <div className="text-[10px] font-heading text-white/40 mb-1">LOCATION</div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">Earth, Mars Hub</div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    AVAILABLE_FOR_NEW_MISSIONS
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
