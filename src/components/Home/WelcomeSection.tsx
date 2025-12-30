"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeSection({ onEnter }: { onEnter: (name: string) => void }) {
  const [inputValue, setInputValue] = useState("");
  const [isEchoing, setIsEchoing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsEchoing(true);
    setTimeout(() => onEnter(inputValue), 3000);
  };

  return (
    <div className="relative w-full max-w-[340px] px-4">
      <AnimatePresence mode="wait">
        {!isEchoing ? (
          <motion.div
            key="input-form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="bg-white/[0.03] backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl text-center"
          >
            <div className="mb-6">
              <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-bold">Protocol</span>
              <h2 className="text-white text-2xl font-serif italic mt-1">Identity Required</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/20 text-center text-2xl text-white py-3 outline-none focus:border-gold-500 transition-colors font-serif placeholder:text-white/10"
                  autoFocus
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group relative w-full overflow-hidden rounded-full bg-white py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-gold-500"
              >
                <span className="relative z-10">Enter the Kingdom</span>
                {/* Shimmer Effect */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="echo-screen"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-gold-400 italic drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                Hello, {inputValue}
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/40 text-[10px] tracking-[0.5em] uppercase"
            >
              Preparing the Royal Experience...
            </motion.p>

            {/* Elegant Loader */}
            <div className="w-12 h-[1px] bg-gold-500/30 mx-auto mt-8 overflow-hidden">
               <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-full h-full bg-gold-500"
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}