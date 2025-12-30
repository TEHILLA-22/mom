"use client";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_DATA = [
  { url: "/mom1.jpg", text: "An Extraordinary Mom" },
  { url: "/mom2.jpg", text: "With Love, From Your Pikins ❤️" },
  { url: "/mom3.jpg", text: "Grace in Every Step" },
  { url: "/mom4.jpg", text: "The Heart of Our Home" },
  { url: "/pkins.jpg", text: "Beauty Without Limits" },
];

function Carousel({ radius = 1.8, setIndex }: { radius?: number, setIndex: (i: number) => void }) {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (group.current) {
      // Rotate group
      group.current.rotation.y = scroll.offset * Math.PI * 2;
      
      // Calculate which index is "in front" (approximate)
      const totalImages = IMAGE_DATA.length;
      const progress = scroll.offset * totalImages;
      const currentIndex = Math.round(progress) % totalImages;
      setIndex(currentIndex);
    }
  });

  return (
    <group ref={group}>
      {IMAGE_DATA.map((item, i) => {
        const angle = (i / IMAGE_DATA.length) * Math.PI * 2;
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Image
              url={item.url}
              position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
              rotation={[0, angle, 0]}
              scale={[1.2, 1.6]}
              transparent
              edge={0.1}
            />
          </Float>
        );
      })}
    </group>
  );
}

export default function ImageCarouselSection() {
  const [index, setIndex] = useState(0);

  // Helper to render typing animation for the current text
  const TypingText = ({ text }: { text: string }) => {
    const letters = Array.from(text);
    return (
      <motion.div 
        className="flex justify-center flex-wrap gap-x-1"
        initial="hidden"
        animate="visible"
      >
        {letters.map((char, i) => (
          <motion.span
            key={`${text}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 5 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.1, delay: i * 0.05 }}
            className="text-gold-400 font-serif italic text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="w-full h-[70vh] relative flex flex-col justify-center items-center">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 4], fov: 35 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          
          <ScrollControls pages={3} horizontal damping={0.2}>
            <Carousel setIndex={setIndex} />
          </ScrollControls>
        </Canvas>
      </div>

      {/* DYNAMIC TYPING CAPTION */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <TypingText text={IMAGE_DATA[index].text} />
            
            {/* Subtle light bar below text */}
            <motion.div 
              className="h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent w-32 mx-auto mt-4"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}