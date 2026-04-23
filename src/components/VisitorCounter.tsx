import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EXCLUDED_IPS: string[] = [
  '172.58.148.252',
  '2607:fb91:2f99:46fc:ac39:38f7:7d76:368',
];

interface VisitorData {
  count: number;
  lastVisit: string;
}

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('etheria_visitors');
    let data: VisitorData;
    
    if (stored) {
      data = JSON.parse(stored);
    } else {
      data = { count: 0, lastVisit: '' };
    }

    const sessionVisited = sessionStorage.getItem('etheria_session_visited');
    const today = new Date().toDateString();
    
    if (!sessionVisited || data.lastVisit !== today) {
      checkAndIncrementCount(data, today);
    } else {
      setVisitorCount(data.count);
    }

    if (counterRef.current && !hasAnimated) {
      gsap.fromTo(counterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 95%',
            once: true
          }
        }
      );
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  const checkAndIncrementCount = async (data: VisitorData, today: string) => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      if (EXCLUDED_IPS.includes(ip)) {
        setVisitorCount(data.count);
        return;
      }

      const newCount = data.count + 1;
      const newData: VisitorData = { count: newCount, lastVisit: today };
      localStorage.setItem('etheria_visitors', JSON.stringify(newData));
      sessionStorage.setItem('etheria_session_visited', 'true');
      setVisitorCount(newCount);
    } catch (error) {
      const newCount = data.count + 1;
      const newData: VisitorData = { count: newCount, lastVisit: today };
      localStorage.setItem('etheria_visitors', JSON.stringify(newData));
      sessionStorage.setItem('etheria_session_visited', 'true');
      setVisitorCount(newCount);
    }
  };

  const formatDisplay = (num: number): string => {
    if (num === 0) return 'Zero';
    return num.toString().padStart(6, '0');
  };

  const displayText = formatDisplay(visitorCount);
  const isZero = visitorCount === 0;

  return (
    <div ref={counterRef} className="relative z-[50] bg-background py-16 border-t border-border/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-secondary/50 border border-primary/30 flex items-center justify-center">
              <Eye size={32} className="text-primary" />
            </div>
          </div>

          <p className="font-cinzel text-primary/70 text-xs tracking-[0.3em] mb-6">
            SEEKERS WHO HAVE PASSED THROUGH
          </p>

          <div className={`relative flex items-center justify-center ${isZero ? 'px-8' : 'gap-1'}`}>
            {isZero ? (
              <span className="font-cinzel text-4xl sm:text-5xl text-foreground font-semibold tracking-[0.15em]">
                {displayText}
              </span>
            ) : (
              displayText.split('').map((digit, index) => (
                <div key={index} className="digit relative w-10 h-14 sm:w-12 sm:h-16 bg-secondary/30 border border-primary/30 rounded-sm flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                  <span className="relative font-cinzel text-2xl sm:text-3xl text-foreground font-semibold tracking-wider">{digit}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/40" />
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <Users size={16} className="text-primary/50" />
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
