import { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, BookOpen, Lock, Flame, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollSnapDelay } from '../hooks/useScrollSnapDelay';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const containerRef = useScrollSnapDelay(800, 600);
  const etheriaRef = useRef<HTMLDivElement>(null);
  const arcanumRef = useRef<HTMLDivElement>(null);
  const masteringRef = useRef<HTMLDivElement>(null);
  const deadspeakRef = useRef<HTMLDivElement>(null);
  const comingSoonRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    etheria: false,
    arcanum: false,
    mastering: false,
    deadspeak: false,
  });

  const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animateSection = (ref: React.RefObject<HTMLDivElement | null>, delay = 0) => {
        const content = ref.current?.querySelector('.product-content');
        if (content) {
          gsap.fromTo(content, { opacity: 0, y: 60 }, {
            opacity: 1, y: 0, duration: 1.2, delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: ref.current, start: 'top 60%', toggleActions: 'play none none reverse' },
          });
        }
      };

      animateSection(etheriaRef, 0);
      animateSection(arcanumRef, 0.15);
      animateSection(masteringRef, 0.15);
      animateSection(deadspeakRef, 0.15);

      if (comingSoonRef.current) {
        gsap.fromTo(comingSoonRef.current, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: comingSoonRef.current, start: 'top 65%', toggleActions: 'play none none reverse' },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full overflow-x-hidden">
      {/* Etheria — Full Page */}
      <section ref={etheriaRef} data-snap-section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <LazyVideo hero src="./etheria-hero-video.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-[#0a0a0b]/30" />
        <div className="product-content relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-screen">
          <div className="w-full lg:w-1/2 xl:w-5/12">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0a0a0b]/35 border border-[#ffffff]/10 backdrop-blur-md shadow-[0_0_60px_rgba(201,162,39,0.15)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#c9a227] p-3 bg-[rgba(201,162,39,0.15)] rounded-lg backdrop-blur-sm"><Sparkles className="w-8 h-8" /></span>
                <h2 className="font-cinzel text-4xl sm:text-5xl text-[#f5f5f5] drop-shadow-lg">Etheria</h2>
              </div>
              <p className="text-[#d4d4d4] text-lg leading-relaxed mb-2 drop-shadow-md">
                {expanded.etheria
                  ? "Quantum AI powered meditation and psychic awareness study tool. Includes meditation techniques of all types: Timed meditation with ambient sounds, Chakra Alignment Meditations, and more. Also includes study tools and hands-on practical classes which help evolve your psychic gifts with the belief that all have the ability to see beyond the mundane with practice."
                  : "Quantum AI powered meditation and psychic awareness study tool. Includes meditation techniques of all types..."}
              </p>
              <button onClick={() => toggle('etheria')} className="mb-6 text-[#c9a227] text-sm font-cinzel tracking-wider flex items-center gap-1 hover:text-[#f5f5f5] transition-colors cursor-pointer">
                {expanded.etheria ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Read More <ChevronDown className="w-4 h-4" /></>}
              </button>
              <div className="flex flex-wrap gap-3 mb-8">
                {['AI Divination', 'Spiritual Guidance', 'Personal Readings'].map((f, i) => (
                  <span key={i} className="px-4 py-2 bg-[rgba(201,162,39,0.2)] text-[#c9a227] rounded-full border border-[rgba(201,162,39,0.4)] text-sm backdrop-blur-sm drop-shadow-sm">{f}</span>
                ))}
              </div>
              <Link to="/etheria" className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]">Explore Etheria <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 xl:w-7/12" />
        </div>
      </section>

      {/* Arcanum Liberatus — Full Page */}
      <section ref={arcanumRef} data-snap-section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <LazyVideo lowPriority src="./arcanum-video.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/30" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0b]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-[#0a0a0b]/30" />
        <div className="product-content relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-32 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 min-h-screen">
          <div className="w-full lg:w-1/2 xl:w-5/12">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0a0a0b]/35 border border-[#ffffff]/10 backdrop-blur-md shadow-[0_0_60px_rgba(201,162,39,0.15)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#c9a227] p-3 bg-[rgba(201,162,39,0.15)] rounded-lg backdrop-blur-sm"><Lock className="w-8 h-8" /></span>
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#f5f5f5] drop-shadow-lg">Arcanum Liberatus</h2>
              </div>
              <p className="text-[#c9a227] text-xs font-cinzel tracking-widest uppercase mb-3">Coming Soon</p>
              <p className="text-[#d4d4d4] text-lg leading-relaxed mb-2 drop-shadow-md">
                {expanded.arcanum
                  ? "Powered by Quantum AI, this mobile grimoire blends masterfully ancient knowledge with modern technology and places that knowledge in the palm of your hand. From extensive glossaries detailing crystals and herbs to over 250 gods, goddesses, fey, and spirits from modern to ancient traditions, horoscopes and natal charts, planetary calculators and ritual/spell generators which all can save to a journal which chronicles your experiences on your path--this application will be all you need. You can even customize your grimoire's name."
                  : "Powered by Quantum AI, this mobile grimoire blends masterfully ancient knowledge with modern technology..."}
              </p>
              <button onClick={() => toggle('arcanum')} className="mb-6 text-[#c9a227] text-sm font-cinzel tracking-wider flex items-center gap-1 hover:text-[#f5f5f5] transition-colors cursor-pointer">
                {expanded.arcanum ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Read More <ChevronDown className="w-4 h-4" /></>}
              </button>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Mystical Knowledge', 'Arcane Library', 'Secret Wisdom'].map((f, i) => (
                  <span key={i} className="px-4 py-2 bg-[rgba(201,162,39,0.2)] text-[#c9a227] rounded-full border border-[rgba(201,162,39,0.4)] text-sm backdrop-blur-sm drop-shadow-sm">{f}</span>
                ))}
              </div>
              <Link to="/arcanum-liberatus" className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]">Explore Arcanum Liberatus <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 xl:w-7/12" />
        </div>
      </section>

      {/* Mastering the Cards — Full Page */}
      <section ref={masteringRef} data-snap-section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <LazyVideo lowPriority src="./mastering-video.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0b]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-[#0a0a0b]/30" />
        <div className="product-content relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-screen">
          <div className="w-full lg:w-1/2 xl:w-5/12">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0a0a0b]/45 border border-[#ffffff]/10 backdrop-blur-md shadow-[0_0_60px_rgba(201,162,39,0.15)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#c9a227] p-3 bg-[rgba(201,162,39,0.15)] rounded-lg backdrop-blur-sm"><BookOpen className="w-8 h-8" /></span>
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#f5f5f5] drop-shadow-lg">Mastering the Cards</h2>
              </div>
              <p className="text-[#c9a227] text-xs font-cinzel tracking-widest uppercase mb-3">Coming Soon</p>
              <p className="text-[#d4d4d4] text-lg leading-relaxed mb-2 drop-shadow-md">
                {expanded.mastering
                  ? "Become a professional in the art of reading tarot. Learn all 84 cards inside and out and be able to interpret at a moment's notice with this study tool. Study, learn, and perform popular and ancient tarot spreads while also learning about the ancient traditions which became the tarot that we know of today."
                  : "Become a professional in the art of reading tarot. Learn all 84 cards inside and out..."}
              </p>
              <button onClick={() => toggle('mastering')} className="mb-6 text-[#c9a227] text-sm font-cinzel tracking-wider flex items-center gap-1 hover:text-[#f5f5f5] transition-colors cursor-pointer">
                {expanded.mastering ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Read More <ChevronDown className="w-4 h-4" /></>}
              </button>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Tarot Learning', 'Card Meanings', 'Practice Readings'].map((f, i) => (
                  <span key={i} className="px-4 py-2 bg-[rgba(201,162,39,0.2)] text-[#c9a227] rounded-full border border-[rgba(201,162,39,0.4)] text-sm backdrop-blur-sm drop-shadow-sm">{f}</span>
                ))}
              </div>
              <Link to="/mastering-the-cards" className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]">Explore Mastering the Cards <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 xl:w-7/12" />
        </div>
      </section>

      {/* Dead Speak — Full Page */}
      <section ref={deadspeakRef} data-snap-section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <LazyVideo lowPriority src="./deadspeak-video.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0b]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b]/50 via-transparent to-[#0a0a0b]/30" />
        <div className="product-content relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-32 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 min-h-screen">
          <div className="w-full lg:w-1/2 xl:w-5/12">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0a0a0b]/45 border border-[#ffffff]/10 backdrop-blur-md shadow-[0_0_60px_rgba(201,162,39,0.15)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#c9a227] p-3 bg-[rgba(201,162,39,0.15)] rounded-lg backdrop-blur-sm"><Flame className="w-8 h-8" /></span>
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#f5f5f5] drop-shadow-lg">Dead Speak</h2>
              </div>
              <p className="text-[#c9a227] text-xs font-cinzel tracking-widest uppercase mb-3">Coming Soon</p>
              <p className="text-[#d4d4d4] text-lg leading-relaxed mb-2 drop-shadow-md">
                {expanded.deadspeak
                  ? "Comprehensive tool and spiritualism study guide which describes the beliefs of spiritualists and offers hands on training in the art of communicating with those who have departed and now exist beyond the veil."
                  : "Comprehensive tool and spiritualism study guide which describes the beliefs of spiritualists..."}
              </p>
              <button onClick={() => toggle('deadspeak')} className="mb-6 text-[#c9a227] text-sm font-cinzel tracking-wider flex items-center gap-1 hover:text-[#f5f5f5] transition-colors cursor-pointer">
                {expanded.deadspeak ? <>Show Less <ChevronUp className="w-4 h-4" /></> : <>Read More <ChevronDown className="w-4 h-4" /></>}
              </button>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Ancestral Connection', 'Guided Sessions', 'Sacred Space'].map((f, i) => (
                  <span key={i} className="px-4 py-2 bg-[rgba(201,162,39,0.2)] text-[#c9a227] rounded-full border border-[rgba(201,162,39,0.4)] text-sm backdrop-blur-sm drop-shadow-sm">{f}</span>
                ))}
              </div>
              <Link to="/dead-speak" className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-[#f5f5f5] hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]">Explore Dead Speak <ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 xl:w-7/12" />
        </div>
      </section>

      {/* Coming Soon — Full Page */}
      <section ref={comingSoonRef} data-snap-section className="min-h-screen w-full flex items-center justify-center px-6 sm:px-8 bg-[#0a0a0b]">
        <div className="max-w-2xl mx-auto text-center">
          <img src="/coming-soon-placeholder.jpg" alt="Coming Soon" className="w-24 h-24 mx-auto mb-6 rounded-full object-cover opacity-70" />
          <h2 className="font-cinzel text-3xl text-center mb-4 text-[#f5f5f5]">More Coming Soon</h2>
          <p className="text-[#737373] max-w-lg mx-auto">We're constantly developing new tools to bridge ancient wisdom with modern technology. Stay tuned for upcoming releases.</p>

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
      </section>
    </div>
  );
}

