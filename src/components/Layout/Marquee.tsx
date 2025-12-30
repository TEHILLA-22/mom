"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const images = [
  "/mom1.jpg", "/mom2.jpg", "/mom3.jpg", "/mom4.jpg", "/family.jpg"
];

export default function DualMarquee() {
  return (
    <div className="fixed inset-y-0 left-0 w-16 z-0 pointer-events-none">
      {/* Left Column - Scrolling UP */}
      <div className="w-16 md:w-24 overflow-hidden h-full border-r border-white/10">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-4"
        >
          {[...images, ...images].map((src, i) => (
            <div key={i} className="relative aspect-[3/4] w-full">
              <Image src={src} alt="Mom" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Column - Scrolling DOWN */}
      <div className="w-16 md:w-24 overflow-hidden h-full border-l border-white/10">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex flex-col gap-4"
        >
          {[...images, ...images].map((src, i) => (
            <div key={i} className="relative aspect-[3/4] w-full">
              <Image src={src} alt="Mom" fill className="object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}