"use client";
import { motion } from "framer-motion";

const milestones = [
  { label: "Years of Love", value: "30+", icon: "❤️" },
  { label: "Laughs Shared", value: "∞", icon: "😊" },
  { label: "Lives Touched", value: "1000+", icon: "✨" },
  { label: "Amazing Pikins", value: "3", icon: "👑" },
];

export default function Milestones() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-20">
      {milestones.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center backdrop-blur-sm"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className="text-2xl font-bold text-gold-500">{item.value}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}