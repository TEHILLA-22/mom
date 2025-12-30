"use client";
import { motion } from "framer-motion";

export default function LiquidTransition({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[95]">
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ scale: 0, borderRadius: "100%" }}
        animate={{ 
          scale: isOpen ? 4 : 0,
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
        style={{ filter: "url(#goo)" }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-gold-500 origin-center"
      />
    </div>
  );
}