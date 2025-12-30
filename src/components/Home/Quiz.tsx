"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  { q: "What is Mom's absolute best food?", a: ["Jollof Rice", "Starch and Banga", "Egusi Soup"], correct: 1 },
  { q: "What is her dream vacation country?", a: ["Paris", "London", "Miami"], correct: 2 },
  { q: "What is her signature best color?", a: ["Gold", "White", "Royal Blue"], correct: 1 },
  { q: "What is her favorite flower of all time?", a: ["Rose", "Lily", "Sunflower"], correct: 0 },
  { q: "Which was her best vacation of all time?", a: ["Time in Lagos", "Time in Warri", "Time in Abuja", "Time in Gombe"], correct: 1 }, // Assuming Warri for the Banga connection!
];

export default function BirthdayQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].correct) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setShowFinal(true);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white/[0.03] border border-gold-500/20 rounded-3xl backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {!showFinal ? (
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <p className="text-white text-lg text-center font-medium">{questions[current].q}</p>
            <div className="grid gap-3">
              {questions[current].a.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAnswer(i)} 
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500 hover:bg-gold-500/10 transition-all text-sm"
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-center text-white/30 uppercase tracking-widest">Question {current + 1} of {questions.length}</p>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
            <h4 className="text-gold-500 text-3xl font-serif mb-2">Quiz Complete!</h4>
            <p className="text-white/70">You know Mom {Math.round((score/questions.length)*100)}% perfectly!</p>
            <button onClick={() => {setCurrent(0); setShowFinal(false); setScore(0);}} className="mt-6 text-xs text-white/40 underline uppercase tracking-widest">Retry Quiz</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}