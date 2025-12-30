"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeartLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const letterContent = `To our dearest Momma, 

On this special day, we wanted to tell you that you are more than just a mother to us; you are our guiding light and our greatest inspiration. 

Thank you for your endless sacrifices, your "Starch and Banga" that tastes like home, and for showing us what beauty without limits truly looks like.

With all our love, 
Your Pkins ❤️`;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div 
        className="relative cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope Body */}
        <div className="relative w-72 h-48 bg-zinc-800 rounded-b-xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Wax Seal Icon */}
          <motion.div 
            animate={{ scale: isOpen ? 0 : 1 }}
            className="z-20 w-12 h-12 bg-gold-600 rounded-full border-2 border-gold-400 flex items-center justify-center shadow-[0_0_15px_rgba(184,134,11,0.5)]"
          >
            <span className="text-black font-bold text-lg italic">M</span>
          </motion.div>

          {/* Decorative lines on envelope */}
          <div className="absolute inset-0 border-t-[100px] border-t-transparent border-l-[144px] border-l-zinc-700/50 border-r-[144px] border-r-zinc-700/50 border-b-[100px] border-b-transparent pointer-events-none" />
        </div>

        {/* Envelope Flap (The Top) */}
        <motion.div 
          animate={{ rotateX: isOpen ? 180 : 0 }}
          style={{ transformOrigin: "top" }}
          className="absolute top-0 left-0 w-full h-24 bg-zinc-700 rounded-t-xl border border-white/10 z-10"
        />

        {/* The Letter Paper */}
        <motion.div 
          animate={{ 
            y: isOpen ? -180 : 0,
            scale: isOpen ? 1.1 : 0.95,
            zIndex: isOpen ? 30 : 5
          }}
          className="absolute inset-x-2 top-2 bg-white p-6 rounded-lg shadow-2xl min-h-[250px] text-black"
        >
          <div className="font-serif italic text-sm leading-relaxed">
            <AnimatePresence>
              {isOpen && (
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.03 } 
                    }
                  }}
                >
                  {letterContent.split("").map((char, i) => (
                    <motion.span 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <p className="mt-8 text-white/40 text-[10px] uppercase tracking-[0.4em]">
        {isOpen ? "Tap to close" : "Tap to open your letter"}
      </p>
    </div>
  );
}