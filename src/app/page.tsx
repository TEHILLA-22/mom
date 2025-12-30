"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// Visual & Layout Components
import CelestialBackground from "@/components/Visuals/Stars";
import DualMarquee from "@/components/Layout/Marquee";
import BackgroundMusic from "@/components/Visuals/BackgroundMusic";
import Fireworks from "@/components/Visuals/Fireworks";


// Section Components
import WelcomeSection from "@/components/Home/WelcomeSection";
import ImageCarouselSection from "@/components/Visuals/Carousel3D";
import Milestones from "@/components/Home/Milestones";
import PkinsReveal from "@/components/Visuals/PkinsReveal";
import BirthdayQuiz from "@/components/Home/Quiz";
import Guestbook from "@/components/Home/Guestbook";
import HeartLetter from "@/components/Home/HeartLetter"

export default function Home() {
  const [userName, setUserName] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);

  const handleEnter = (name: string) => {
    setUserName(name);
    setShowContent(true);
  };

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-gold-500/30 overflow-x-hidden">
      {/* 1. PERSISTENT BACKGROUNDS */}
      <CelestialBackground />
      <DualMarquee />
      <BackgroundMusic isPlaying={showContent} isDucked={isGuestbookOpen} />

      <AnimatePresence mode="wait">
        {!showContent ? (
          /* PHASE 1: THE WELCOME GATE */
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              rotateY: 90, 
              scale: 0.9,
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
            className="flex items-center justify-center min-h-screen px-6 relative z-20"
          >
            <WelcomeSection onEnter={handleEnter} />
          </motion.div>
        ) : (
          /* PHASE 2: THE RICH CONTENT WORLD */
          <motion.div
            key="main-content"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full"
          >
            <Fireworks />
            
            {/* Main Content Scrollable Area */}
            <div className="max-w-5xl mx-auto pt-10 pb-20 px-4 md:px-20">
              
              {/* Section 1: 3D Photo Journey */}
              <section className="min-h-screen flex flex-col justify-center items-center py-10">
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-gold-500 tracking-[0.5em] uppercase text-[9px] mb-12 font-bold"
                >
                  Swipe to see her grace
                </motion.p>
                <ImageCarouselSection />
              </section>

              {/* Section 2: Milestones Stats */}
              <section className="py-20">
                <Milestones />
              </section>

              {/* Section 3: The Pkins (Sons) Heart Reveal */}
              <section className="min-h-screen flex items-center justify-center py-20">
                <PkinsReveal imageSrc="/pkins.jpg" />
              </section>

              <section className="py-20">
  <HeartLetter />
</section>

              {/* Section 4: Personalized Birthday Quiz */}
              <section className="py-24 px-4 bg-white/[0.03] border-y border-white/5 rounded-[3rem] mb-20">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-serif italic text-gold-400">The Momma Quiz</h2>
                  <p className="text-white/30 text-[10px] mt-2 uppercase tracking-widest">How well do you know her?</p>
                </div>
                <BirthdayQuiz />
              </section>

              {/* Section 5: The Grand Finale (Cake + Branding) */}
              <section className="py-20 text-center flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  className="text-8xl mb-6 filter drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                >
                  🎂
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-serif text-gold-500 italic">Happy Birthday, Momma!</h2>
                
                {/* Repositioned Branding */}
                <p className="text-white/50 mt-4 text-[10px] tracking-[0.3em] uppercase font-medium">
                  Developed with love by Tehilla
                </p>
              </section>

            {/* Section 6: Interactive Guestbook Trigger */}
<section className="mt-10 mb-20 px-4">
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setIsGuestbookOpen(true)}
    className="bg-white rounded-[3rem] p-2 shadow-[0_20px_50px_rgba(255,255,255,0.1)] cursor-pointer group"
  >
    <div className="bg-white text-black p-8 md:p-12 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6 text-center md:text-left">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-gold-500 transition-colors duration-500">
          <MessageCircle size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight">Well Wishes</h2>
          <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Leave a message for the Queen</p>
        </div>
      </div>

      <div className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest group-hover:bg-gold-500 group-hover:text-black transition-all duration-300">
        OPEN GUESTBOOK
      </div>
    </div>
  </motion.div>
</section>

{/* The actual Modal that pops up */}
<Guestbook 
  isOpen={isGuestbookOpen} 
  onClose={() => setIsGuestbookOpen(false)} 
  userName={userName} 
/>

              {/* Footer Copyright */}
              <footer className="text-center py-10 text-white/20 text-[9px] tracking-widest uppercase">
                © 2025 All Rights Reserved • Royal Birthday Collection
                <p>Powered by Tehillz</p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}