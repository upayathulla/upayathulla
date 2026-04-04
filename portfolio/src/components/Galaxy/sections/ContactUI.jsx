import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Radio, Rocket, ShieldCheck, Mail, Map, MessageSquare } from 'lucide-react';

export default function ContactUI({ onClose }) {
  const [formState, setFormState] = useState('IDLE'); // IDLE, SENDING, SENT

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('SENDING');
    setTimeout(() => {
      setFormState('SENT');
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 100 }}
      className="fixed bottom-10 left-10 z-50 w-full max-w-md"
    >
      <div className="glass-morphism p-10 rounded-glass border border-emerald-400/20 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-emerald-400/10 rounded-2xl border border-emerald-400/20">
                <Radio size={24} className="text-emerald-400 animate-pulse" />
            </div>
            <div>
                <h2 className="text-3xl font-heading text-white tracking-widest leading-none uppercase">UP_LINK</h2>
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.3em] font-bold mt-2">SECURE_COMM_CHANNEL</p>
            </div>
        </div>

        <AnimatePresence mode="wait">
            {formState !== 'SENT' ? (
                <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                >
                    <div>
                        <label className="text-[10px] font-heading text-white/40 uppercase tracking-[0.2em] mb-3 block">MISSION_COMMANDER_NAME</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all placeholder:text-white/20" 
                            placeholder="OPERATOR_NAME"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-heading text-white/40 uppercase tracking-[0.2em] mb-3 block">SIGNAL_DESTINATION_EMAIL</label>
                        <input 
                            required
                            type="email" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all placeholder:text-white/20" 
                            placeholder="NAME@UNIVERSE.SPACE"
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-heading text-white/40 uppercase tracking-[0.2em] mb-3 block">ENCRYPTED_MESSAGE</label>
                        <textarea 
                            required
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all placeholder:text-white/20 resize-none" 
                            placeholder="COMMUNICATION_CONTENT..."
                        />
                    </div>

                    <button 
                        disabled={formState === 'SENDING'}
                        type="submit"
                        className="w-full group relative overflow-hidden rounded-full p-px bg-linear-to-r from-emerald-500 to-primary shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-transform active:scale-95"
                    >
                         <div className="relative px-8 py-5 bg-bg-surface rounded-full flex items-center justify-center gap-4 group-hover:bg-transparent transition-colors duration-500">
                             <div className="text-white font-heading font-black text-xs tracking-[0.3em] uppercase">
                                 {formState === 'SENDING' ? 'BROADCASTING...' : 'INITIATE_UP_LINK'}
                             </div>
                             {formState === 'SENDING' ? (
                                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                                     <Rocket size={18} className="text-emerald-400" />
                                 </motion.div>
                             ) : (
                                 <Send size={18} className="text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                             )}
                         </div>
                    </button>

                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/20 uppercase tracking-widest mt-8">
                         <ShieldCheck size={12} className="text-emerald-400/40" />
                         AES_256_SIGNAL_ENCRYPTION_ACTIVE
                    </div>
                </motion.form>
            ) : (
                <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10"
                >
                    <motion.div 
                        initial={{ y: 0 }}
                        animate={{ y: -500, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeIn" }}
                        className="mb-8 p-6 bg-emerald-400/20 rounded-full border border-emerald-400/40 shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                    >
                        <Rocket size={48} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-heading text-emerald-400 mb-2 tracking-widest uppercase">SIGNAL_SENT</h3>
                    <p className="text-xs font-heading font-light text-white/60 text-center uppercase tracking-widest leading-loose">
                        YOUR_TRANSMISSION_HAS_BEEN<br />BROADCASTED_ACROSS_THE_GALAXY
                    </p>
                    <button 
                        onClick={() => setFormState('IDLE')}
                        className="mt-10 px-8 py-3 glass-morphism rounded-full text-[10px] font-heading font-bold text-white/40 hover:text-white transition-colors border border-white/5 shadow-2xl uppercase tracking-widest"
                    >
                        SEND_ANOTHER_SIGNAL
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Dynamic scanner background */}
        <div className="absolute inset-0 z-[-1] overflow-hidden opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-px bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,1)] animate-scanning" />
        </div>
      </div>
    </motion.div>
  );
}
