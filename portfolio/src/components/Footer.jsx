import React from "react";
import { Cpu, Copyright, Heart, ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { developerDetails } from "../data/portfolio-data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border-dim bg-black/40 py-12 px-4 md:px-10 lg:px-20 mt-20 group overflow-hidden">
      {/* HUD BACKGROUND DECORATION */}
      <div className="absolute top-0 right-10 vertical-text text-[10px] text-white/5 font-black uppercase tracking-[1em] select-none">
        DEPLOYMENT_COMPLETE_PROTOCOL_02
      </div>
      
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
        
        {/* LEFT: Branding & System Status */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary-red flex items-center justify-center tech-frame p-0 animate-pulse">
                <Cpu className="text-white" size={20} />
             </div>
             <div className="flex flex-col">
                <span className="text-white font-tech text-lg font-black uppercase tracking-tighter">VISION_TERMINAL</span>
                <span className="text-primary-red text-[8px] font-black uppercase tracking-[0.2em]">Status: SYNC_ESTABLISHED</span>
             </div>
          </div>
          <p className="text-text-gray text-[10px] font-mono leading-relaxed max-w-sm uppercase tracking-widest opacity-60">
            Handcrafted with precision for the next generation of web interfaces. Built using React.js, Tailwind 4.0, and Framer Motion. 
          </p>
        </div>

        {/* CENTER: Designer Credit */}
        <div className="flex flex-col items-center md:items-center gap-2">
           <div className="tech-frame px-6 py-3 border-white/5 bg-black/40 flex items-center gap-4 group-hover:border-primary-red transition-all">
              <span className="text-primary-red flex items-center gap-2 text-[10px] uppercase font-black">
                <Heart size={12} className="fill-current animate-pulse" /> DevelopedBy:
              </span>
              <span className="text-white font-tech text-sm font-black uppercase tracking-tight">
                {developerDetails.name}
              </span>
           </div>
           <div className="flex items-center gap-4 mt-2">
              <a href={developerDetails.github} target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="text-text-gray hover:text-primary-red transition-colors"><Github size={16} /></a>
              <a href={developerDetails.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="text-text-gray hover:text-primary-red transition-colors"><Linkedin size={16} /></a>
              <a href={`mailto:${developerDetails.email}`} aria-label="Send Email" className="text-text-gray hover:text-primary-red transition-colors"><Mail size={16} /></a>
           </div>
        </div>

        {/* RIGHT: Copyright & Scroll to Top */}
        <div className="flex flex-col items-end gap-4">
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-white font-tech text-[10px] font-black uppercase">
                <Copyright size={12} /> {new Date().getFullYear()} ALL_RIGHTS_RESERVED
              </div>
              <span className="text-[8px] text-text-gray font-mono uppercase mt-1 tracking-widest">
                ARY_TECH_X_SYSTEM_V4.02
              </span>
           </div>
           
           <button 
             onClick={scrollToTop}
             aria-label="Scroll to Top"
             className="tech-frame p-4 bg-primary-red hover:bg-white text-white hover:text-primary-red transition-all group/btn"
           >
              <ArrowUp size={20} className="group-hover/btn:-translate-y-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* FOOTER BARCODE */}
      <div className="mt-12 opacity-10 flex justify-center grayscale">
         <div className="tech-frame border-white w-full max-w-4xl h-8 flex items-center justify-center p-0 overflow-hidden relative">
            <div className="flex gap-1">
               {[...Array(60)].map((_, i) => (
                  <div key={i} className="bg-white w-[1px] md:w-[2px]" style={{ height: `${Math.random() * 100}%` }} />
               ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
         </div>
      </div>
    </footer>
  );
}
