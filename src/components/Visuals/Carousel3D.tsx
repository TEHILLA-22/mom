"use client";
import * as THREE from "three";
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Preload, Float, useTexture } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_DATA = [
  { url: "/mom1.jpg", text: "An Extraordinary Mom" },
  { url: "/mom2.jpg", text: "Beauty Without Limits" },
  { url: "/mom3.jpg", text: "Grace in Every Step" },
  { url: "/mom4.jpg", text: "The Heart of Our Home" },
  { url: "/pkins.jpg", text: "With Love, From Your Pkins ❤️" },
];

function Scene({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null);
  const radius = 2.5;

  // Optimized smooth rotation
  useFrame((state, delta) => {
    if (group.current) {
      const targetRotation = -(activeIndex * ((Math.PI * 2) / IMAGE_DATA.length));
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.05 // Very smooth transition
      );
    }
  });

  return (
    <group ref={group}>
      {IMAGE_DATA.map((item, i) => (
        <ImageCard 
          key={i} 
          url={item.url} 
          index={i} 
          radius={radius} 
          isActive={i === activeIndex} 
        />
      ))}
    </group>
  );
}

function ImageCard({ url, index, radius, isActive }: { url: string; index: number; radius: number; isActive: boolean }) {
  // LAZY LOADING: useTexture loads the image and caches it
  const texture = useTexture(url);
  const angle = (index / IMAGE_DATA.length) * Math.PI * 2;
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      const scale = isActive ? 1.5 : 1.0;
      ref.current.scale.lerp(new THREE.Vector3(scale, scale, 1), 0.1);
    }
  });

  return (
    <Float speed={isActive ? 2 : 0} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh 
        ref={ref} 
        position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
        rotation={[0, angle, 0]}
      >
        <planeGeometry args={[1.2, 1.6]} />
        <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

export default function ImageCarouselSection() {
  const [index, setIndex] = useState(0);

  // AUTO-PLAY LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGE_DATA.length);
    }, 3500); // 3.5 seconds for a premium feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[70vh] relative overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Scene activeIndex={index} />
          {/* Preloads all assets before the site is fully interactive */}
          <Preload all />
        </Suspense>
      </Canvas>

      {/* TEXT OVERLAY */}
      <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-gold-400 font-serif italic text-2xl drop-shadow-lg"
          >
            {IMAGE_DATA[index].text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
