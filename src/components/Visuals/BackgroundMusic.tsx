"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic({ isPlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Playback blocked:", err));
        audioRef.current.volume = 0.4; // Keep it elegant and not overwhelming
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <audio ref={audioRef} src="/birthday-theme.mp3" loop />
      <button 
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
          }
        }}
        className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gold-400 hover:bg-white/10 transition-all"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
}