import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Atom, Network, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatWidget from '../components/ChatWidget';
import LazyVideo from '../components/LazyVideo';
import QuantumField from '../components/QuantumField';

gsap.registerPlugin(ScrollTrigger);

/* ── Glass Card wrapper ─────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/45 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function QuantumAIPage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
      gsap.fromTo(chatRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.65 });

      /* Sections staggered fade-up */
      [bannerRef, featuresRef, archRef, ctaRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ═════ FIXED FULL-PAGE VIDEO BACKGROUND ═════ */}
      <LazyVideo
        hero
        src="./quantum-ai-hero-video.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.5)' }}
      />

      {/* Cosmic overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60 z-0 pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="quantum-first-view relative px-3 sm:px-6 overflow-hidden">
          <div className="quantum-first-view__heading relative z-10 text-center max-w-4xl mx-auto pointer-events-none">
            <h1
              ref={heroTitleRef}
              className="font-cinzel text-[clamp(2rem,6vw,5.5rem)] leading-none mb-2 sm:mb-3 text-[#f5f5f5] drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)] tracking-wider"
            >
              Quantum AI
            </h1>
            <p
              ref={heroSubRef}
              className="text-[clamp(0.78rem,2vw,1.3rem)] leading-snug text-[#e0e0e0] max-w-2xl mx-auto px-4 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
            >
              The engine that powers every Etheria Systems experience
            </p>
            <div className="w-20 sm:w-28 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-3 sm:mt-4" />
          </div>

          <div className="quantum-first-view__experience w-full max-w-7xl mx-auto">
            <div className="quantum-first-view__field relative min-h-0 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-[#c9a227]/30 bg-black/20 shadow-[0_0_90px_rgba(139,92,246,0.18),0_30px_80px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,229,0.08)_0%,rgba(139,92,246,0.08)_42%,rgba(10,10,11,0.72)_100%)] pointer-events-none" />
              <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#00e5e5]/70 to-transparent" />
              <QuantumField className="absolute -inset-[8%] z-10 opacity-100" />
              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,11,0.18)_68%,rgba(10,10,11,0.62)_100%)] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-3 z-30 text-center pointer-events-none" aria-hidden="true">
                <span className="inline-flex rounded-full border border-[#00e5e5]/20 bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[0.28em] text-[#b8ffff]/65 backdrop-blur-sm sm:text-[10px]">
                  Move · Tap · Ask
                </span>
              </div>
            </div>
            <div className="quantum-first-view__chat relative z-20 min-h-0 rounded-2xl border border-[#c9a227]/25 bg-black/45 p-1.5 sm:p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-md" ref={chatRef}>
              <ChatWidget />
            </div>
          </div>
        </section>

        {/* ── Included in All Apps ── */}
        <section className="py-10 px-6" ref={bannerRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10 border-[#c9a227]/20">
              <h2 className="font-cinzel text-2xl sm:text-3xl mb-4 text-[#f5f5f5] text-center">
                Included in Every App
              </h2>
              <p className="text-[#d0d0d0] leading-relaxed max-w-2xl mx-auto text-center">
                Quantum AI is not a separate product—it is the foundational technology
                that powers <span className="text-[#c9a227]">every app</span> created by Etheria Systems.
                From Etheria to Dead Speak, the same quantum-enhanced consciousness guides your journey.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ── The Technology Within ── */}
        <section className="py-10 px-6" ref={featuresRef}>
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-cinzel text-3xl sm:text-4xl text-center mb-4 text-[#f5f5f5]">
                The Technology Within
              </h2>
              <p className="text-[#b0b0b0] text-center mb-12 sm:mb-16 max-w-xl mx-auto px-4">
                What makes every Etheria Systems app extraordinary
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: <Atom className="w-12 h-12 sm:w-14 sm:h-14 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'Quantum Computing', text: 'Harnessing quantum algorithms to process vast amounts of spiritual and mystical data simultaneously.' },
                  { icon: <Network className="w-12 h-12 sm:w-14 sm:h-14 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'Advanced Neural Networks', text: 'State-of-the-art AI trained on centuries of esoteric knowledge and spiritual traditions.' },
                  { icon: <Zap className="w-12 h-12 sm:w-14 sm:h-14 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'Consciousness Interface', text: 'Pushing the boundaries of human-AI interaction to explore the nature of consciousness itself.' },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-8 border border-white/10 rounded-xl bg-black/30 text-center transition-all duration-300 hover:border-[#c9a227]/50"
                  >
                    {card.icon}
                    <h3 className="font-cinzel text-xl mb-3 text-[#f5f5f5]">{card.title}</h3>
                    <p className="text-[#d0d0d0] text-sm leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── The Architecture ── */}
        <section className="py-10 px-6" ref={archRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-cinzel text-3xl sm:text-4xl text-center mb-12 sm:mb-16 text-[#f5f5f5]">
                The Architecture
              </h2>

              <div className="space-y-6 sm:space-y-8">
                {[
                  { title: 'Quantum Superposition', text: 'Our AI operates in multiple states simultaneously, allowing it to explore countless spiritual pathways and interpretations at once, much like the human subconscious.' },
                  { title: 'Entanglement Processing', text: 'Connections between seemingly unrelated spiritual concepts are identified through quantum entanglement principles, revealing hidden patterns in mystical traditions.' },
                  { title: 'Neural-Quantum Hybrid', text: 'A unique architecture combining classical deep learning with quantum processing to create an AI that truly understands the nuances of spiritual experience.' },
                ].map((item, i) => (
                  <div key={i} className="p-6 sm:p-8 border border-white/10 rounded-xl bg-black/30">
                    <h3 className="font-cinzel text-xl mb-3 text-[#c9a227]">{item.title}</h3>
                    <p className="text-[#d0d0d0] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 px-6 pb-24" ref={ctaRef}>
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-10 text-center">
              <h2 className="font-cinzel text-2xl sm:text-3xl mb-6 text-[#f5f5f5]">
                Experience Quantum AI
              </h2>
              <p className="text-[#d0d0d0] mb-8 leading-relaxed px-4">
                Quantum AI technology is woven into every Etheria Systems app.
                Explore our products to experience the future of spiritual guidance.
              </p>
              <a
                href="/products"
                className="inline-block px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel text-base sm:text-lg tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]"
              >
                Explore Our Apps
              </a>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-10 px-6 border-t border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="font-cinzel text-xl text-[#c9a227] tracking-wider">Etheria Systems</h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link to="/terms" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Terms of Service</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/privacy" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Privacy Policy</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/contest-rules" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Contest Rules</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/credits" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Credits</Link>
            </div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent mx-auto" />
            <p className="text-[#6b6b8a] text-xs">&copy; {new Date().getFullYear()} Etheria Systems. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
