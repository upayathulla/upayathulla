import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/portfolio-data";
import { Briefcase, ListTodo, Zap, Terminal } from "lucide-react";

export default function Experience() {
  return (
    <div className="flex flex-col gap-16 relative">
      {/* Background vertical label to match "DS4 - 1774822-5" look */}
      <div className="absolute -left-16 top-10 vertical-text text-[14px] font-black text-white/5 uppercase tracking-[1em] select-none pointer-events-none">
         ACTIVITY_LOG_ENTRIES_JAN_2025_PRES
      </div>

      {experience.map((job, index) => (
        <motion.div
           key={index}
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: index * 0.1 }}
           className="relative pl-10 md:pl-20 border-l border-white/10 group"
        >
           {/* Timeline marker with ID Badge style from image */}
           <div className="absolute left-[-12px] top-0 w-6 h-6 bg-primary-red flex items-center justify-center p-0 border border-white/20 group-hover:scale-125 transition-all">
              <Zap size={14} className="text-white" />
           </div>

           <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
              <div className="flex flex-col max-w-2xl">
                 <div className="flex items-center gap-6 mb-4">
                    <span className="text-primary-red text-xs font-black uppercase tracking-[0.4em]">DEPLOYMENT_UNIT: MU-FRD</span>
                    <span className="h-px flex-1 bg-white/10" />
                    <span className="text-text-gray text-[10px] font-bold uppercase tracking-widest">{job.period}</span>
                 </div>
                 
                 <h3 className="font-tech text-4xl font-black text-white uppercase group-hover:text-primary-red transition-colors duration-500">
                    {job.company}
                 </h3>
                 <div className="text-primary-red text-sm font-bold uppercase tracking-widest mt-2 mb-10 flex items-center gap-4">
                    <Terminal size={14} />
                    {job.role}
                 </div>

                 <div className="flex flex-col gap-6">
                    {job.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="tech-frame border-white/5 bg-secondary-dark/30 flex items-start gap-4 p-4 group/h">
                         <div className="w-10 h-10 border border-white/10 flex items-center justify-center p-0 text-white/20 text-[10px] uppercase font-bold group-hover/h:border-primary-red group-hover/h:text-primary-red transition-all">
                            H{hIdx + 1}
                         </div>
                         <p className="text-text-gray text-xs leading-relaxed font-mono uppercase tracking-wider flex-1">
                            {highlight}
                         </p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Technical readout on the right for visuals */}
              <div className="hidden lg:flex flex-col gap-6 w-56 pt-10">
                 <div className="tech-frame w-full p-4 border-white/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-[8px] font-bold text-text-gray uppercase">
                       <span>Operations_Rate</span>
                       <span className="text-primary-red">Optimum</span>
                    </div>
                    {/* Visual frequency bars */}
                    <div className="flex items-end gap-[2px] h-12">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="flex-1 bg-primary-red/20 border-t border-primary-red" style={{ height: `${Math.random() * 80 + 20}%` }} />
                       ))}
                    </div>
                    <div className="text-[6px] text-text-gray uppercase tracking-widest text-center mt-2 border-t border-white/5 pt-2">
                       Active_Refactoring_Engaged
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      ))}
    </div>
  );
}
