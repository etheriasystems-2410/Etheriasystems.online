import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, Lightbulb } from 'lucide-react';
import AntiqueMirrorFrame from '../components/AntiqueMirrorFrame';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

/* ── Glass Card wrapper ─────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/45 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function AboutPage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const creatorRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });

      /* Sections staggered fade-up */
      [missionRef, visionRef, creatorRef, valuesRef].forEach((ref) => {
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
        src="./about-hero-video.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.5)' }}
      />

      {/* Portal overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55 z-0 pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-[75vh] flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              ref={heroTitleRef}
              className="font-cinzel text-5xl md:text-6xl mb-6 text-[#f5f5f5] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            >
              About Etheria Systems
            </h1>
            <p
              ref={heroSubRef}
              className="text-xl text-[#e0e0e0] max-w-2xl mx-auto drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
            >
              Bridging Ancient Wisdom with Modern Technology
            </p>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="py-10 px-6" ref={missionRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Target className="w-10 h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-3xl text-[#f5f5f5]">Our Mission</h2>
              </div>
              <p className="text-[#d0d0d0] text-lg leading-relaxed text-center max-w-3xl mx-auto">
                At Etheria Systems, we believe that the wisdom of the ages should not be lost to time.
                Our mission is to preserve and make accessible the profound spiritual and mystical
                traditions of humanity through the power of artificial intelligence. We seek to create
                tools that honor these ancient practices while making them relevant and available to
                the modern seeker.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ── Vision ── */}
        <section className="py-10 px-6" ref={visionRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Lightbulb className="w-10 h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-3xl text-[#f5f5f5]">Our Vision</h2>
              </div>
              <p className="text-[#d0d0d0] text-lg leading-relaxed text-center max-w-3xl mx-auto">
                We envision a world where technology serves spirituality, not replaces it. Where AI
                becomes a bridge between the ancient and the modern, helping people connect with
                timeless wisdom in ways that resonate with contemporary life. Our platforms are
                designed to enhance human spiritual experience, not automate it.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ── Developer ── */}
        <section className="py-10 px-6" ref={creatorRef}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-cinzel text-3xl text-center mb-12 text-[#f5f5f5]">
                Meet the Creator
              </h2>

              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-72 sm:w-80 lg:w-96 flex-shrink-0">
                  <AntiqueMirrorFrame
                    videoSrc="/developer-video.mp4"
                    posterSrc="/developer-poster.jpg"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">
                    The Mind Behind Etheria
                  </h3>
                  <p className="text-[#d0d0d0] leading-relaxed mb-4">
                    Etheria Systems was born from a deep passion for both technology and spirituality.
                    With limited coding knowledge and a lifelong study of esoteric traditions, the creator
                    set out to build something unique: AI systems that truly understand and respect the
                    mystical dimensions of human experience that doesn't seek to replace tradition with
                    technology, only to enhance it and increase the ease of access for the everyday individual.
                  </p>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    Every product we create is crafted with care, combining technical excellence with
                    spiritual sensitivity. We believe that the future of AI lies not just in solving
                    practical problems, but in helping humanity explore the deeper questions of existence.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-10 px-6 pb-24" ref={valuesRef}>
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <h2 className="font-cinzel text-3xl text-center mb-12 text-[#f5f5f5]">
                Our Values
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Respect', text: 'We approach every spiritual tradition with deep respect and reverence, honoring its origins and practitioners.' },
                  { title: 'Innovation', text: 'We push the boundaries of what AI can do while staying true to the essence of the wisdom we seek to preserve.' },
                  { title: 'Accessibility', text: 'We believe spiritual wisdom should be available to all who seek it, regardless of background or experience.' },
                ].map((card, i) => (
                  <div key={i} className="p-8 border border-white/10 rounded-xl bg-black/30 text-center">
                    <h3 className="font-cinzel text-xl mb-3 text-[#c9a227]">{card.title}</h3>
                    <p className="text-[#d0d0d0]">{card.text}</p>
                  </div>
                ))}
              </div>
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
