import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio-data";
import { Cpu, Code, Database, Layers, Layout, ShieldCheck } from "lucide-react";

export default function About() {
  const categories = [
    { id: "frontend", title: "Frontend Architecture", icon: <Cpu />, list: skills.frontend },
    { id: "uiux", title: "Interface Systems", icon: <Layout />, list: skills.uiux },
    { id: "api", title: "Integration Protocols", icon: <Layers />, list: skills.api },
    { id: "tools", title: "Technical Armory", icon: <ShieldCheck />, list: skills.tools },
    { id: "backend", title: "Subsystem Core", icon: <Database />, list: skills.backend },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {categories.map((cat, index) => (
        <motion.div 
           key={index}
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: index * 0.1 }}
           className="tech-frame border-white/5 bg-secondary-dark/50 group"
        >
           {/* Category Header */}
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/5 tech-frame flex items-center justify-center p-0 border-white/20 group-hover:bg-primary-red group-hover:border-primary-red transition-all duration-500">
                 {React.cloneElement(cat.icon, { size: 20, className: "text-white" })}
              </div>
              <div className="flex flex-col">
                 <span className="text-primary-red text-[10px] font-bold tracking-[0.4em] uppercase">SYSTEM_NODE</span>
                 <h3 className="font-tech text-white text-xl uppercase tracking-tighter">
                    {cat.title}
                 </h3>
              </div>
           </div>

           {/* List of Skills */}
           <div className="flex flex-col gap-3 mb-8">
              {cat.list.map((skill, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs font-mono text-text-gray/90 uppercase tracking-widest border-b border-white/20 pb-1">
                       <span>{skill}</span>
                       <span className="text-primary-red font-bold">100%</span>
                    </div>
                   {/* Technical Progress indicator visual */}
                   <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-primary-red w-full flex gap-1 opacity-50">
                         {/* Fragmented bar for tech look */}
                         {[...Array(10)].map((_, i) => (
                           <div key={i} className="flex-1 h-full bg-primary-red" />
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Diagnostic Status Box */}
           <div className="tech-frame border-white/30 p-2 text-[10px] font-bold text-text-gray/90 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,60,0.6)]" />
                 Diagnostic_Stable
              </span>
              <span>VER_01.S</span>
           </div>
        </motion.div>
      ))}
    </div>
  );
}
