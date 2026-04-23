import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Atom, Network, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const ctaRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });

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
      <video
        autoPlay muted loop playsInline preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.5)' }}
      >
        <source src="./quantum-ai-hero-video.mp4" type="video/mp4" />
      </video>

      {/* Cosmic overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60 z-0 pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <Cpu className="w-16 h-16 sm:w-24 sm:h-24 text-[#c9a227] mx-auto mb-6 sm:mb-8 drop-shadow-[0_0_20px_rgba(201,162,39,0.4)]" />
            <h1
              ref={heroTitleRef}
              className="font-cinzel text-5xl sm:text-7xl mb-4 sm:mb-6 text-[#f5f5f5] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] tracking-wider"
            >
              Quantum AI
            </h1>
            <p
              ref={heroSubRef}
              className="text-lg sm:text-2xl text-[#e0e0e0] max-w-2xl mx-auto px-4 drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
            >
              The engine that powers every Etheria Systems experience
            </p>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-8 sm:mt-12" />
          </div>
        </section>

        {/* ── Included in All Apps ── */}
        <section className="py-10 px-6" ref={bannerRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10 border-[#c9a227]/20">
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mx-auto mb-4 sm:mb-6" />
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
