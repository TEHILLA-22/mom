"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function CelestialBackground() {
  // Generate a stable set of random stars so they don't move on every re-render
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* 1. THE AMBIENT GLOW (Defined in globals.css) */}
      <div className="queen-bg-glow" />

      {/* 2. THE TWINKLING STAR FIELD */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0.2 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1] 
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
            }}
          />
        ))}
      </div>

      {/* 3. OPTIONAL: VIGNETTE EFFECT (Darkens the edges for more focus) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}