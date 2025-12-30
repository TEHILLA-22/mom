"use client";
import * as THREE from "three";
import { useRef, useState } from "react";
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

function CarouselItem({ url, angle, radius, isCenter }: { url: string; angle: number; radius: number; isCenter: boolean }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      const targetScale = isCenter ? 1.4 : 1.0;
      // '0.1' is the smoothing factor. Lower is smoother/slower.
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    }
  });

  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image
          url={url}
          position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
          rotation={[0, -angle, 0]}
          scale={[1.2, 1.6]}
          transparent
        />
      </Float>
    </group>
  );
}

function Carousel({ radius = 2.2, setIndex }: { radius?: number; setIndex: (i: number) => void }) {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const [localIndex, setLocalIndex] = useState(0);

  useFrame((state, delta) => {
    if (group.current) {
      // SMOOTH ROTATION: We lerp the rotation so it doesn't "snap" when the user stops scrolling
      const targetRotation = scroll.offset * Math.PI * 2;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.1 // This adds a "weighted" feel to the scroll
      );
      
      const totalImages = IMAGE_DATA.length;
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
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 35 }}
          // performance optimization
          dpr={[1, 2]} 
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          
          {/* Damping 0.4 makes the scroll feel like it's on oil—very smooth */}
          <ScrollControls pages={4} horizontal damping={0.4} infinite={false}>
            <Carousel setIndex={setIndex} />
          </ScrollControls>
        </Canvas>
      </div>

      <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gold-400 font-serif italic text-2xl md:text-3xl">
               {IMAGE_DATA[index].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
