import React from "react";
import { motion } from "framer-motion";
import { education, certifications } from "../data/portfolio-data";
import { GraduationCap, Award, BookOpen, ScrollText } from "lucide-react";

export default function Education() {
   return (
      <div className="flex flex-col gap-20">

         {/* Education Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {education.map((edu, index) => (
               <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="tech-frame border-white/10 group bg-secondary-dark/30 hover:border-primary-red transition-all duration-500"
               >
                  <div className="flex items-start gap-6 mb-6">
                     <div className="w-14 h-14 tech-frame border-white/20 flex items-center justify-center p-0 group-hover:bg-primary-red group-hover:border-primary-red transition-all">
                        <GraduationCap className="text-white" size={24} />
                     </div>
                     <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-primary-red text-[10px] font-bold tracking-[0.4em] uppercase">Academic_Cert // 0{index + 1}</span>
                           <span className="text-text-gray/90 text-xs uppercase font-bold tracking-widest">{edu.year}</span>
                        </div>
                        <h3 className="font-tech text-2xl font-black text-white uppercase leading-tight group-hover:text-primary-red transition-colors">
                           {edu.degree}
                        </h3>
                     </div>
                  </div>

                  <div className="h-px w-full bg-white/5 mb-6" />

                  <div className="flex flex-col gap-4">
                     <div className="flex items-center gap-4 text-text-gray/90 text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-2">
                        <span className="text-primary-red font-bold">Institution:</span>
                        <span>{edu.institution}</span>
                     </div>
                     <div className="flex items-center gap-4 text-text-gray/90 text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-2">
                        <span className="text-primary-red font-bold">Score_Result:</span>
                        <span>{edu.score}</span>
                     </div>
                  </div>

                  {/* Corner technical marker */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                     <div className="w-20 h-1 bg-white/10 rotate-45 translate-x-10 translate-y-[-10px]" />
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Certifications Block */}
         <div className="mt-10">
            <div className="flex items-center gap-6 mb-10">
               <h3 className="font-tech text-white text-3xl uppercase tracking-tighter">Specializations</h3>
               <div className="h-px grow bg-white/10" />
               <ScrollText className="text-primary-red" size={20} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {certifications.map((cert, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     className="tech-frame border-white/5 p-4 flex flex-col gap-3 group bg-black/40"
                  >
                     <div className="flex justify-between items-center">
                        <span className="text-primary-red text-[8px] font-black tracking-widest uppercase">Verified_Credential</span>
                        <Award size={14} className="text-white/40 group-hover:text-primary-red transition-colors" />
                     </div>
                     <h4 className="font-tech text-white text-lg uppercase tracking-tight">{cert.title}</h4>
                     <div className="flex flex-col gap-1 border-t border-white/10 pt-2 mt-2">
                        <span className="text-text-gray/90 text-[10px] font-bold uppercase">{cert.issuer}</span>
                        <span className="text-primary-red text-[10px] font-bold uppercase leading-relaxed">{cert.details}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
   );
}
