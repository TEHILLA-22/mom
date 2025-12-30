"use client";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, ScrollControls, useScroll, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_DATA = [
  { url: "/mom1.jpg", text: "An Extraordinary Mom" },
  { url: "/mom2.jpg", text: "Beauty Without Limits" },
  { url: "/mom3.jpg", text: "Grace in Every Step" },
  { url: "/mom4.jpg", text: "The Heart of Our Home" },
  { url: "/pkins.jpg", text: "With Love, From Your Pkins ❤️" },
];

interface CarouselItemProps {
  url: string;
  angle: number;
  radius: number;
  isCenter: boolean;
}

function CarouselItem({ url, angle, radius, isCenter }: CarouselItemProps) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current) {
      const targetScale = isCenter ? 1.4 : 1.0;
      // Smoothly interpolate scale for that "Zoom" effect
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    }
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Image
          url={url}
          position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
          rotation={[0, -angle, 0]} // Negative angle keeps photos facing outward
          scale={[1.2, 1.6]}
          transparent
          // grayscale removed/simplified to avoid version-specific prop errors
          // edge removed as it caused the build failure
        />
      </Float>
    </group>
  );
}

function Carousel({ radius = 2.2, setIndex }: { radius?: number; setIndex: (i: number) => void }) {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const [localIndex, setLocalIndex] = useState(0);

  useFrame(() => {
    if (group.current) {
      // Logic: Rotate the cylinder based on scroll
      group.current.rotation.y = scroll.offset * Math.PI * 2;
      
      const totalImages = IMAGE_DATA.length;
      // Calculate which image is currently in focus
      const currentIndex = Math.round(scroll.offset * totalImages) % totalImages;
      
      if (currentIndex !== localIndex) {
        setLocalIndex(currentIndex);
        setIndex(currentIndex);
      }
    }
  });

  return (
    <group ref={group}>
      {IMAGE_DATA.map((item, i) => (
        <CarouselItem 
          key={i}
          url={item.url}
          angle={(i / IMAGE_DATA.length) * Math.PI * 2}
          radius={radius}
          isCenter={i === localIndex}
        />
      ))}
    </group>
  );
}

export default function ImageCarouselSection() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full h-[75vh] relative flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          
          <ScrollControls pages={4} horizontal damping={0.3}>
            <Carousel setIndex={setIndex} />
          </ScrollControls>
        </Canvas>
      </div>

      {/* TYPING CAPTION AREA */}
      <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gold-400 font-serif italic text-2xl md:text-3xl drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
               {IMAGE_DATA[index].text}
            </p>
            <motion.div 
              className="h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent w-40 mx-auto mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
