import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Try autoplay on load
    const tryAutoplay = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };
    tryAutoplay();

    // Try to play on first interaction
    const handleInteraction = () => {
      if (!hasInteracted && !isPlaying && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      audioRef.current?.pause();
    };
  }, [hasInteracted, isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-5 right-5 z-[1000] bg-[rgba(10,10,11,0.9)] border border-[#262626] rounded-full px-5 py-2.5 flex items-center gap-2.5 cursor-pointer transition-all duration-300 hover:border-[#c9a227] ${
        isPlaying ? 'playing' : ''
      }`}
    >
      <div
        className={`w-[30px] h-[30px] rounded-full bg-[#c9a227] flex items-center justify-center text-[0.8rem] text-[#0a0a0b] ${
          isPlaying ? 'animate-pulse' : ''
        }`}
      >
        ♪
      </div>
      <span className="font-cinzel text-[0.75rem] tracking-[0.08em] text-[#f5f5f5]">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </span>
    </button>
  );
}
