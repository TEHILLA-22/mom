"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface PkinsProps {
  imageSrc: string; 
}

export default function PkinsReveal({ imageSrc }: PkinsProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-6">
      {/* Golden Aura Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-[300px] h-[300px] bg-gold-500/20 rounded-full blur-[100px]"
      />

      <motion.div
        initial={{ y: 100, opacity: 0, rotateY: 45 }}
        whileInView={{ y: 0, opacity: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 20,
          delay: 0.2 
        }}
        className="relative group"
      >
        {/* Decorative Frame */}
        <div className="absolute -inset-4 border border-gold-500/30 rounded-2xl scale-95 group-hover:scale-105 transition-transform duration-700" />
        
        <div className="relative w-64 h-80 md:w-80 md:h-[450px] overflow-hidden rounded-xl border-2 border-gold-500/50 shadow-[0_0_50px_rgba(250,204,21,0.2)]">
          <Image 
            src={imageSrc} 
            alt="Her Lovely Pkins" 
            fill 
            className="object-cover transform group-hover:scale-110 transition-transform duration-[3000ms]"
          />
          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>

        {/* Floating Hearts Particles */}
        <div className="absolute -top-10 -right-10 text-4xl animate-bounce">❤️</div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center z-10"
      >
        <h2 className="text-3xl md:text-5xl font-serif italic text-gold-400 mb-2">
          From Your Lovely Pkins
        </h2>
        <p className="text-xs tracking-[0.5em] text-white/40 uppercase">
          Your legacy, your joy, your sons
        </p>
      </motion.div>
    </div>
  );
}