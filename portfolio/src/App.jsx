import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Info, TriangleAlert, Cpu, Database, Layout, Menu, Github, Mail, Phone, MapPin, Globe, Trophy, Star, Zap } from "lucide-react";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";
import GamingHUD from "./components/GamingHUD";

// Memoize sections to prevent re-renders on App state changes
const MemoHero = React.memo(Hero);
const MemoAbout = React.memo(About);
const MemoProjects = React.memo(Projects);
const MemoExperience = React.memo(Experience);
const MemoEducation = React.memo(Education);
const MemoContact = React.memo(Contact);
const MemoNavbar = React.memo(Navbar);
const MemoFooter = React.memo(Footer);
const MemoBackground3D = React.memo(Background3D);

export default function App() {
   const [loading, setLoading] = useState(true);
   const [serial, setSerial] = useState("DS4-1774822-5");

   // GAME_TECH_FEATURES
   const [xp, setXp] = useState(0);
   const [level, setLevel] = useState(1);
   const [achievements, setAchievements] = useState([]);
   const [toast, setToast] = useState(null);
   const [clicks, setClicks] = useState([]);
   const [isGlitching, setIsGlitching] = useState(false);

   const { scrollYProgress } = useScroll();
   const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
   const xpValue = useTransform(smoothY, [0, 1], [0, 1000]);

   const bootLogs = [
      "INITIALIZING_NEURAL_INTERFACE_MU...",
      "CALIBRATING_FRONTEND_REACT_ENGINE...",
      "SYNTHESIZING_HUD_OVERLAYS...",
      "ESTABLISHING_ARYU_X_PROTOCOL...",
      "DATA_INTEGRITY_CHECK: 100%_SECURE",
      "DECODING_RECORDS: MOHAMMED_SYS",
      "BOOT_SEQUENCE_COMPLETE",
   ];
   const [logIndex, setLogIndex] = useState(0);
   const [bootProgress, setBootProgress] = useState(0);

   const addAchievement = (title, icon) => {
      if (achievements.find(a => a.title === title)) return;
      const newAchieve = { title, icon: icon || <Trophy />, id: Date.now() };
      setAchievements((prev) => [...prev, newAchieve]);
      setToast(newAchieve);
      setTimeout(() => setToast(null), 4000);
   };

   useEffect(() => {
      const unsubscribe = xpValue.on("change", (v) => {
         setXp(Math.floor(v));
         const newLevel = Math.floor(v / 200) + 1;
         if (newLevel > level) {
            setLevel(newLevel);
            addAchievement(`RANK_UP: LEVEL_${newLevel}`, <Star className="text-yellow-400" />);
         }
      });

      const checkScrollAchieve = () => {
         if (window.scrollY > 1500 && window.scrollY < 1600) addAchievement("PROJECT_VETERAN", <Layout className="text-primary-red" />);
         if (window.scrollY > 3000 && window.scrollY < 3100) addAchievement("INTEL_ACQUIRED", <Database className="text-blue-400" />);
      };
      window.addEventListener("scroll", checkScrollAchieve);

      return () => {
         unsubscribe();
         window.removeEventListener("scroll", checkScrollAchieve);
      };
   }, [level, achievements]);

   const parallaxX = useTransform(smoothY, [0, 1], [0, 50]);
   const parallaxY = useTransform(smoothY, [0, 1], [0, -100]);

   useEffect(() => {
      const handleMouseClick = (e) => {
         const id = Date.now();
         setClicks((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
         setTimeout(() => setClicks((prev) => prev.filter(c => c.id !== id)), 600);
      };

      window.addEventListener("mousedown", handleMouseClick);

      const logInterval = setInterval(() => {
         setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
      }, 280);

      const progressInterval = setInterval(() => {
         setBootProgress((prev) => (prev < 100 ? prev + Math.floor(Math.random() * 20) : 100));
      }, 200);

      const timer = setTimeout(() => setLoading(false), 2400);

      const serialInterval = setInterval(() => {
         const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
         let res = "DS4-";
         for (let i = 0; i < 9; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
         setSerial(res);
         setTimeout(() => setSerial("DS4-1774822-5"), 150);
      }, 4500);

      const glitchInterval = setInterval(() => {
         if (Math.random() > 0.95) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 150);
         }
      }, 2000);

      return () => {
         window.removeEventListener("mousedown", handleMouseClick);
         clearInterval(logInterval);
         clearInterval(progressInterval);
         clearInterval(serialInterval);
         clearInterval(glitchInterval);
         clearTimeout(timer);
      };
   }, []);

   return (
      <div className="relative min-h-screen bg-primary-dark text-text-white font-mono overflow-hidden">
         
         <MemoBackground3D />
         
         <GamingHUD 
            level={level} 
            xp={xp} 
         />

         {/* 2. PARALLAX HUD OVERLAY (Extra depth) */}
         <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="fixed inset-0 pointer-events-none opacity-20 z-0"
         >
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary-red/5 blur-[200px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 blur-[150px] rounded-full" />
         </motion.div>

         {/* CLICK EFFECTS */}
         <AnimatePresence>
            {clicks.map(click => (
               <motion.div
                  key={click.id}
                  initial={{ opacity: 1, scale: 0, border: "2px solid #ff003c" }}
                  animate={{ opacity: 0, scale: 4, border: "1px solid #ff003c" }}
                  exit={{ opacity: 0 }}
                  style={{ left: click.x, top: click.y }}
                  className="fixed w-4 h-4 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2"
               />
            ))}
         </AnimatePresence>

         {/* GLITCH OVERLAY LAYER */}
         <AnimatePresence>
            {isGlitching && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-primary-red z-9999 pointer-events-none mix-blend-overlay"
               />
            )}
         </AnimatePresence>

         {/* ACHIEVEMENT TOAST (Restructured) */}
         <AnimatePresence>
            {toast && (
               <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="fixed top-24 left-24 z-2000 tech-frame border-primary-red bg-secondary-dark p-6 flex items-center gap-6 shadow-[0_0_50px_rgba(255,0,60,0.3)]"
               >
                  <div className="w-12 h-12 rounded-full border-2 border-primary-red flex items-center justify-center bg-primary-red/10">
                     {toast.icon}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-primary-red text-[8px] font-black uppercase tracking-[0.3em]">Achievement_Unlocked</span>
                     <span className="text-white font-tech text-lg font-black uppercase">{toast.title}</span>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <MemoNavbar />

         <AnimatePresence>
            {loading && (
               <motion.div
                  exit={{
                     opacity: 0,
                     filter: "blur(40px) contrast(200%)",
                     scale: 1.2,
                     transition: { duration: 0.8, ease: "circIn" }
                  }}
                  className="fixed inset-0 z-5000 flex flex-col items-center justify-center bg-black px-10"
               >
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,rgba(255,0,60,0.1)_1px,transparent_1px),linear-gradient(rgba(255,0,60,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
                  <div className="relative w-full max-w-2xl flex flex-col gap-10">
                     <div className="flex justify-between items-end border-b-2 border-primary-red pb-4">
                        <div className="flex flex-col">
                           <span className="text-primary-red text-[10px] font-black tracking-[0.4em] uppercase mb-1">System_Boot_Manager_MU_2025</span>
                           <h2 className="font-tech text-3xl font-black text-white italic">VISION_OS</h2>
                        </div>
                        <Cpu className="text-primary-red animate-pulse" size={28} />
                     </div>
                     <div className="flex flex-col gap-2 min-h-[140px]">
                        {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
                           >
                              <span className={i === logIndex ? "text-primary-red animate-pulse" : "text-text-gray"}>{i === logIndex ? ">>>" : "[OK]"}</span>
                              <span className={i === logIndex ? "text-white" : "text-text-gray/50"}>{log}</span>
                           </motion.div>
                        ))}
                     </div>
                     <div className="flex flex-col gap-4 mt-6">
                        <div className="flex justify-between text-[10px] font-black tracking-widest text-primary-red uppercase">
                           <span>Deployment_Progress</span>
                           <span>{Math.min(bootProgress, 100)}%</span>
                        </div>
                        <div className="h-4 w-full border border-white/20 p-[2px] bg-black/50 overflow-hidden relative">
                           <div className="h-full flex gap-1">
                              {[...Array(20)].map((_, i) => (
                                 <motion.div key={i} animate={{ opacity: bootProgress > (i * 5) ? 1 : 0 }} className="flex-1 bg-primary-red h-full border-r border-black/20" />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>

         <div className="noise-overlay" />

         <aside className="fixed top-16 left-0 bottom-0 w-16 border-r border-border-dim z-1000 hidden lg:flex flex-col items-center py-8">
            <div className="vertical-text text-[10px] text-text-gray font-bold tracking-[0.5em] mb-auto transition-all duration-150">
               {serial}
            </div>
         </aside>

         <aside className="fixed top-16 right-0 bottom-0 w-16 border-l border-border-dim z-1000 hidden lg:flex flex-col items-center py-8">
            <div className="mb-auto">
               <TriangleAlert size={20} className="text-primary-red animate-pulse" />
            </div>
            <div className="vertical-text text-[8px] text-text-gray font-bold tracking-[0.2em] mt-auto">
               CONNECTED // PORT_8080 // LVL_{level}
            </div>
         </aside>

         <main className="lg:pl-16 lg:pr-16 pt-4 relative">
            <section id="hero" className="relative group"><MemoHero /></section>
            <div className="border-y border-border-dim bg-secondary-dark relative px-10 py-6 overflow-hidden">
               <motion.div animate={{ x: [0, -500] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="flex items-center gap-16 whitespace-nowrap">
                  {[...Array(10)].map((_, i) => (
                     <React.Fragment key={i}>
                        <span className="text-[10px] font-black tracking-[0.4em] text-text-gray uppercase">RANK: ELITE_LEVEL_{level}</span>
                        <span className="text-[10px] font-black tracking-[0.4em] text-primary-red uppercase">TOTAL_XP: {xp}</span>
                        <span className="text-white/10 opacity-20">//////////////////////////////</span>
                     </React.Fragment>
                  ))}
               </motion.div>
            </div>
            <section id="projects" className="py-4 px-4 md:px-10 lg:px-10 max-w-screen-2xl mx-auto">
               <h2 className="section-title" data-text="CATALOGUE">CATALOGUE</h2>
               <MemoProjects />
            </section>
            <section id="about" className="py-4 px-4 md:px-10 lg:px-10 max-w-screen-2xl mx-auto">
               <h2 className="section-title" data-text="DOSSIER">DOSSIER</h2>
               <MemoAbout />
            </section>
            <section id="experience" className="py-4 px-4 md:px-10 lg:px-10 max-w-screen-2xl mx-auto">
               <h2 className="section-title" data-text="OPERATIONS">OPERATIONS</h2>
               <MemoExperience />
            </section>
            <section id="education" className="py-4 px-4 md:px-10 lg:px-10 max-w-screen-2xl mx-auto">
               <h2 className="section-title" data-text="TRAINING">TRAINING</h2>
               <MemoEducation />
            </section>
            <section id="contact" className="py-4 pb-6 px-4 md:px-10 lg:px-10 max-w-screen-2xl mx-auto">
               <h2 className="section-title" data-text="FREQUENCIES">FREQUENCIES</h2>
               <MemoContact />
            </section>
            <MemoFooter />
         </main>
      </div>
   );
}
