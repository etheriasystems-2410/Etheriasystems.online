import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function BackgroundMusic() {
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/background-music.mp3"
        loop
        muted={isMuted}
        preload="auto"
      />
      <button
        onClick={isMuted ? toggleMute : togglePlay}
        className={`fixed right-6 z-[200] w-12 h-12 rounded-full bg-[rgba(201,162,39,0.2)] border border-[#c9a227] flex items-center justify-center text-[#c9a227] transition-all duration-300 hover:bg-[#c9a227] hover:text-[#0a0a0b] ${location.pathname === '/credits' ? 'bottom-20' : 'bottom-6'}`}
        title={isMuted ? 'Click to enable music' : isPlaying ? 'Pause music' : 'Play music'}
      >
        {isMuted ? <span>🔇</span> : isPlaying ? <span>🎵</span> : <span>▶</span>}
      </button>
    </>
  );
}
