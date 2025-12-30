"use client";
import { useEffect, useRef } from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  isDucked?: boolean; // The '?' makes it optional
}

export default function BackgroundMusic({ isPlaying, isDucked = false }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Audio blocked", err));
        
        // Logic for "Ducking" the volume
        // 0.4 when listening normally, 0.1 when guestbook is open
        audioRef.current.volume = isDucked ? 0.1 : 0.4;
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isDucked]);

  return (
    <audio ref={audioRef} loop>
      <source src="/birthday-theme.mp3" type="audio/mpeg" />
    </audio>
  );
}
