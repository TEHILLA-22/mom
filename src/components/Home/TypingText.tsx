"use client";
import { motion, Variants } from "framer-motion";

export function TypingCaption({ text }: { text: string }) {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // TypeScript now knows this is specifically a spring
        damping: 12,
        stiffness: 200,
      } as const, // <--- ADD THIS 'as const'
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      animate="visible"
      key={text}
      className="justify-center"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={`${text}-${index}`}
          className="text-gold-400 font-serif italic text-xl md:text-3xl"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
