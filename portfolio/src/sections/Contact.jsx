import React from "react";
import { motion } from "framer-motion";
import { developerDetails } from "../data/portfolio-data";
import { Send, Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, TriangleAlert } from "lucide-react";

export default function Contact() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

         {/* Contact Form Section */}
         <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="tech-frame border-white/10 bg-black/40 p-8 md:p-12 relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 border border-white/5 opacity-20 rotate-45 translate-x-12 translate-y-[-12px]" />

            <div className="flex flex-col gap-10">
               <div className="flex flex-col gap-2">
                  <span className="text-primary-red text-xs font-bold tracking-[0.4em] uppercase">Communication_Module // MU-TX.01</span>
                  <h3 className="font-tech text-3xl font-black text-white uppercase tracking-tighter">Transmit_Signal</h3>
               </div>

               <form className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                   <label className="text-xs text-text-gray/90 font-bold uppercase tracking-widest pl-2">Subject_Sender</label>
                   <input 
                     type="text" 
                     placeholder="ENTER_NAME_IDENTIFIER" 
                     className="tech-frame w-full bg-white/5 border-white/20 text-white text-xs font-mono p-4 outline-none focus:border-primary-red transition-all uppercase placeholder:text-white/40"
                   />
                </div>

                  <div className="flex flex-col gap-2">
                   <label className="text-xs text-text-gray/90 font-bold uppercase tracking-widest pl-2">Frequency_Coordinate</label>
                   <input 
                     type="email" 
                     placeholder="ENTER_EMAIL_PROTOCOL" 
                     className="tech-frame w-full bg-white/5 border-white/20 text-white text-xs font-mono p-4 outline-none focus:border-primary-red transition-all uppercase placeholder:text-white/40"
                   />
                </div>

                  <div className="flex flex-col gap-2">
                   <label className="text-xs text-text-gray/90 font-bold uppercase tracking-widest pl-2">Payload_Data</label>
                   <textarea 
                     rows="6" 
                     placeholder="ENTER_MESSAGE_ENCRYPTED" 
                     className="tech-frame w-full bg-white/5 border-white/20 text-white text-xs font-mono p-4 outline-none focus:border-primary-red transition-all uppercase placeholder:text-white/40 resize-none"
                   ></textarea>
                </div>

                  <button className="relative group overflow-hidden tech-frame bg-primary-red border-none text-white font-black text-[10px] uppercase tracking-[0.4em] py-4 h-14 flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all duration-500">
                     <Send size={16} />
                     Transmit_Message
                     {/* Glitch effect on button hover */}
                     <div className="absolute inset-x-full inset-y-0 bg-white/30 group-hover:-inset-x-0 transition-all duration-300" />
                  </button>
               </form>
            </div>
         </motion.div>

         {/* Contact Info & Metadata Section */}
         <div className="flex flex-col gap-10">
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="tech-frame border-white/20 p-8 flex flex-col gap-10 bg-secondary-dark/40"
            >
               <div className="flex flex-col gap-2">
                <span className="text-primary-red text-[10px] font-bold tracking-[0.4em] uppercase">Direct_Connection_Nodes</span>
                <h3 className="font-tech text-3xl font-black text-white uppercase tracking-tighter">Coordinates</h3>
             </div>

               <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-6 group">
                     <div className="w-12 h-12 tech-frame flex items-center justify-center p-0 border-white/10 group-hover:border-primary-red group-hover:bg-primary-red/10 transition-all">
                        <Mail size={18} className="text-white group-hover:text-primary-red transition-colors" />
                     </div>
                     <div className="flex flex-col">
                      <span className="text-primary-red text-[10px] font-bold uppercase tracking-widest">Email_Primary</span>
                      <span className="text-white font-mono text-sm md:text-base uppercase tracking-tight">{developerDetails.email}</span>
                   </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                     <div className="w-12 h-12 tech-frame flex items-center justify-center p-0 border-white/10 group-hover:border-primary-red group-hover:bg-primary-red/10 transition-all">
                        <Phone size={18} className="text-white group-hover:text-primary-red transition-colors" />
                     </div>
                     <div className="flex flex-col">
                      <span className="text-primary-red text-[10px] font-bold uppercase tracking-widest">Phone_Direct</span>
                      <span className="text-white font-mono text-sm md:text-base uppercase tracking-tight">{developerDetails.phone}</span>
                   </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                     <div className="w-12 h-12 tech-frame flex items-center justify-center p-0 border-white/10 group-hover:border-primary-red group-hover:bg-primary-red/10 transition-all">
                        <MapPin size={18} className="text-white group-hover:text-primary-red transition-colors" />
                     </div>
                     <div className="flex flex-col">
                      <span className="text-primary-red text-[10px] font-bold uppercase tracking-widest">Physical_Base</span>
                      <span className="text-white font-mono text-sm md:text-base uppercase tracking-tight">{developerDetails.address}</span>
                   </div>
                  </div>
               </div>

               <div className="flex gap-4 pt-10 border-t border-white/10 mt-auto">
                <div className="tech-frame p-2 px-4 flex items-center gap-2 border-white/20 text-white/70 text-xs uppercase font-bold group cursor-pointer hover:border-primary-red hover:text-white transition-all">
                   <Github size={14} />
                   Git_Hub
                </div>
                <div className="tech-frame p-2 px-4 flex items-center gap-2 border-white/20 text-white/70 text-xs uppercase font-bold group cursor-pointer hover:border-primary-red hover:text-white transition-all">
                   <Globe size={14} />
                   Aryu_Tech
                </div>
             </div>
            </motion.div>

            {/* Technical decorative block - like Figure on right in the original image */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="tech-frame border-primary-red bg-primary-red p-8 flex flex-col gap-4 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-700 cursor-help"
            >
               <div className="flex justify-between items-start">
                  <h3 className="font-tech text-3xl font-black uppercase tracking-tighter">Status_Report</h3>
                  <TriangleAlert size={32} />
               </div>
               <p className="font-black text-sm uppercase leading-tight tracking-[0.2em] mt-4">
                  System fully operational. Ready for deployment on new high-impact projects. Integrated React architecture confirmed.
               </p>
               <div className="barcode-block invert mt-6 opacity-30" />
            </motion.div>
         </div>

      </div>
   );
}
