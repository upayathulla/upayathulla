import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Globe, TriangleAlert } from "lucide-react";

const navLinks = [
  { name: "INDEX", href: "#hero" },
  { name: "CATALOG", href: "#projects" },
  { name: "COMPANY", href: "#about" },
  { name: "OPERATIONS", href: "#experience" },
  { name: "CONTACTS", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 z-[2500] transition-all duration-300 ${scrolled ? 'bg-primary-dark/95 border-b border-border-dim backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto h-full px-8 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-primary-red flex items-center justify-center tech-frame p-0 border-none">
              <Cpu size={18} className="text-white" />
            </div>
            <h1 className="font-tech text-2xl font-black text-white italic tracking-tighter">VISION</h1>
          </motion.div>
          
          <div className="h-4 w-px bg-white/20 hidden md:block" />
          
          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                className="text-text-gray hover:text-primary-red text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE TOGGLES/MENU */}
        <div className="flex items-center gap-10">
          <div className="hidden xl:flex items-center gap-3 text-[8px] text-text-gray font-bold uppercase tracking-widest border border-white/10 px-4 py-2 bg-black/40">
            <TriangleAlert size={12} className="text-primary-red" />
            <span>Operational_Grid: Alpha_01.X</span>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            className="w-10 h-10 tech-frame border-white/20 flex items-center justify-center p-0 text-white hover:border-primary-red hover:bg-primary-red transition-all"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-black flex flex-col items-center justify-center gap-10 z-[2400] overflow-hidden"
          >
            <div className="absolute inset-0 halftone-overlay opacity-5 pointer-events-none" />
            {navLinks.map((link, i) => (
              <a 
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-primary-red text-4xl font-tech font-black uppercase tracking-tighter transition-all hover:scale-110"
              >
                {link.name}
              </a>
            ))}
            
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="w-20 h-px bg-primary-red" />
              <div className="barcode-block opacity-20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
