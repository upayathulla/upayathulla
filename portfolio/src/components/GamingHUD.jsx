import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Wifi, Battery, Activity, ShieldCheck } from "lucide-react";

export default function GamingHUD({ level, xp }) {
   const [thermal, setThermal] = useState(42);
   const [cpuLoad, setCpuLoad] = useState(15);
   const [connection, setConnection] = useState(99);
   const [isHovering, setIsHovering] = useState(false);
   const cursorRef = useRef(null);

   useEffect(() => {
      const handleMouseMove = (e) => {
         if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
         }
         // Efficient hover detection without triggering top-level re-render
         const hovering = !!e.target.closest('a, button, .tech-frame');
         if (hovering !== isHovering) {
            setIsHovering(hovering);
         }
      };

      window.addEventListener("mousemove", handleMouseMove);

      const interval = setInterval(() => {
         setThermal((prev) => Math.max(38, Math.min(65, prev + Math.floor(Math.random() * 5) - 2)));
         setCpuLoad((prev) => Math.max(10, Math.min(80, prev + Math.floor(Math.random() * 10) - 5)));
         setConnection((prev) => Math.max(90, Math.min(100, prev + Math.floor(Math.random() * 3) - 1.5)));
      }, 2000);

      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearInterval(interval);
      };
   }, [isHovering]);

   return (
      <>
         {/* 1. HEALTH / ENERGY / XP BAR (Top Right) */}
         <div className="fixed top-8 right-8 z-2000 flex flex-col items-end gap-3">
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] text-primary-red/70 font-black uppercase tracking-[0.3em]">Synapse_Core // MU</span>
                  <div className="flex items-center gap-2">
                     <span className="text-white font-tech text-2xl italic font-black">L0{level}</span>
                     <div className="h-6 w-[2px] bg-white/20" />
                     <span className="text-white font-tech text-xs font-bold leading-none uppercase">RANK:<br />ELITE</span>
                  </div>
               </div>

               <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 bg-primary-red flex items-center justify-center border-4 border-black/20 shadow-[0_0_20px_#ff003c40]"
               >
                  <Zap className="text-white" size={28} />
               </motion.div>
            </div>

            <div className="w-56 h-3 bg-black/80 border border-white/10 p-px relative overflow-hidden">
               <motion.div
                  animate={{ width: `${(xp % 200) / 2}%` }}
                  className="h-full bg-primary-red shadow-[0_0_10px_#ff003c]"
               />
               <div className="absolute inset-0 flex items-center justify-between px-2 text-[6px] font-black uppercase tracking-widest text-white/50">
                  <span>SYNC_EXP</span>
                  <span>{xp} / {level * 200}</span>
               </div>

               <div className="absolute inset-0 pointer-events-none flex gap-px">
                  {[...Array(20)].map((_, i) => (
                     <div key={i} className="flex-1 border-r border-black/30" />
                  ))}
               </div>
            </div>
         </div>

         {/* 2. SYSTEM MONITORS (Bottom Left) */}
         <div className="fixed bottom-8 left-20 z-2000 hidden xl:flex flex-col gap-4">
            <div className="flex items-center gap-6 opacity-60">
               <div className="flex flex-col">
                  <span className="text-[7px] text-text-gray font-black uppercase tracking-widest">THERMAL_CORE</span>
                  <span className="text-xs font-tech text-white">{thermal}°C</span>
                  <div className="w-12 h-1 bg-white/10 mt-1">
                     <motion.div animate={{ width: `${thermal}%` }} className="h-full bg-primary-red" />
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[7px] text-text-gray font-black uppercase tracking-widest">LOAD_BALANCER</span>
                  <span className="text-xs font-tech text-white">{Math.floor(cpuLoad)}%</span>
                  <div className="w-12 h-1 bg-white/10 mt-1">
                     <motion.div animate={{ width: `${cpuLoad}%` }} className="h-full bg-blue-400" />
                  </div>
               </div>
               <div className="flex flex-col">
                  <span className="text-[7px] text-text-gray font-black uppercase tracking-widest">NET_LATENCY</span>
                  <span className="text-xs font-tech text-white">{connection}ms</span>
                  <div className="w-12 h-1 bg-white/10 mt-1">
                     <motion.div animate={{ width: `${100 - connection + 90}%` }} className="h-full bg-green-400" />
                  </div>
               </div>
            </div>
         </div>

         {/* 3. RADAR / LOCATOR */}
         <div className="fixed top-24 left-20 z-1500 hidden lg:block opacity-40">
            <div className="w-24 h-24 rounded-full border border-white/10 p-2 relative">
               <div className="absolute inset-0 rounded-full border border-primary-red/20 animate-ping duration-[3s]" />
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 w-1/2 h-px bg-primary-red origin-left"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 bg-primary-red rounded-full" />
                  <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-primary-red rounded-full animate-pulse [animation-delay:1s]" />
                  <div className="absolute top-1/2 right-4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse [animation-delay:0.5s]" />
               </div>
            </div>
            <span className="text-[8px] font-mono text-text-gray block mt-2 uppercase tracking-[0.2em]">WAYPOINT_SCANNER</span>
         </div>

         {/* 4. DYNAMIC CROSSHAIR CURSOR OVERLAY - OPTIMIZED WITH REF */}
         <div
            ref={cursorRef}
            className="fixed pointer-events-none z-10000 mix-blend-difference hidden lg:block will-change-transform"
            style={{ transform: 'translate(-50%, -50%)' }}
         >
            <AnimatePresence>
               {isHovering && (
                  <motion.div
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0, opacity: 0 }}
                     className="absolute -top-12 left-6 text-[8px] font-black uppercase text-primary-red flex flex-col gap-1"
                  >
                     <div className="flex items-center gap-2">
                        <Wifi size={10} className="animate-pulse" />
                        <span>LINKING_OBJECT_DATA...</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Activity size={10} />
                        <span>INTERACTION_READY</span>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>

            <motion.div
               animate={{ rotate: isHovering ? 45 : 0 }}
               className="relative w-16 h-16 border border-white/5 flex items-center justify-center"
            >
               <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary-red" />
               <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary-red" />
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary-red" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary-red" />
               <div className="w-1 h-1 bg-primary-red rounded-full" />
            </motion.div>
         </div>

         {/* 5. SIDEBAR TECHNICAL READOUT */}
         <div className="fixed right-2 top-1/2 -translate-y-1/2 z-2000 hidden lg:flex flex-col gap-8 pointer-events-none opacity-40">
            <div className="flex flex-col items-center gap-2">
               <span className="vertical-text text-[6px] font-black uppercase tracking-[0.4em]">SYNC_ESTABLISHED</span>
               <Wifi size={12} className="text-green-500" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="vertical-text text-[6px] font-black uppercase tracking-[0.4em]">BATTERY_LIFE_94%</span>
               <Battery size={12} className="text-primary-red" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="vertical-text text-[6px] font-black uppercase tracking-[0.4em]">SHIELD_ACTIVE</span>
               <ShieldCheck size={12} className="text-blue-400" />
            </div>
         </div>
      </>
   );
}
