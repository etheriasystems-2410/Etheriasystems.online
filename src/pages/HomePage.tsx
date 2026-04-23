import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Brain, BookOpen, MessageSquare, Eye } from 'lucide-react';
import { useVisitorCounter } from '../hooks/useVisitorCounter';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

/* ── Glass Card wrapper ─────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/45 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function HomePage() {
  const products = [
    {
      id: 'etheria',
      title: 'Etheria',
      description: 'Quantum AI powered meditation and psychic awareness study tool. Includes meditation techniques of all types: Timed meditation with ambient sounds, Chakra Alignment Meditations, and more. Also includes study tools and hands-on practical classes which help evolve your psychic gifts with the belief that all have the ability to see beyond the mundane with practice.',
      icon: <Sparkles className="w-8 h-8" />,
      image: '/etheria-product.jpg',
      video: './etheria-hero-video.mp4',
      path: '/etheria'
    },
    {
      id: 'arcanum',
      title: 'Arcanum Liberatus',
      description: 'Powered by Quantum AI, this mobile grimorie blends masterfully ancient knowledge with modern technology and places that knowledge in the palm of your hand. From extensive glossaries detailing crystals and herbs to over 250 gods, goddesses, fey, and spirits from modern to ancient traditions, horoscopes and natal charts, planetary calculators and ritual/spell generators which all can save to a journal which chronicles your experiences on your path--this application will be all you need. You can even customize your grimorie\'s name.',
      icon: <BookOpen className="w-8 h-8" />,
      image: '/arcanum-product.jpg',
      video: '/arcanum-video.mp4',
      path: '/arcanum-liberatus'
    },
    {
      id: 'mastering',
      title: 'Mastering the Cards',
      description: 'Become a professional in the art of reading tarot. Learn all 84 cards inside and out and be able to interpret at a moments notice with this study tool. Study, learn, and perform popular and ancient tarot spreads while also learning about the ancient traditions which became the tarot that we know of today.',
      icon: <Brain className="w-8 h-8" />,
      image: '/mastering-cards-product.jpg',
      video: './mastering-video.mp4',
      path: '/mastering-the-cards'
    },
    {
      id: 'deadspeak',
      title: 'Dead Speak',
      description: 'Comprehensive tool and spiritualism study guide which describes the beliefs of spiritualists and offers hands on training in the art of communicating with those who have departed and now exist beyond the veil.',
      icon: <MessageSquare className="w-8 h-8" />,
      image: '/dead-speak-product.jpg',
      video: '/deadspeak-video.mp4',
      path: '/dead-speak'
    }
  ];

  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroTextRef = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { count, loading } = useVisitorCounter();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
      gsap.fromTo(heroTextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.7 });
      gsap.fromTo(heroBtnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.9 });
      gsap.fromTo(counterRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, delay: 1.1 });

      /* Sections */
      [productsRef, ctaRef].forEach((ref) => {
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
        src="home-hero-video.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.55)' }}
      />

      {/* Ethereal overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55 z-[1] pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              ref={heroTitleRef}
              className="font-cinzel text-5xl md:text-7xl mb-6 tracking-[0.1em] text-[#f5f5f5] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            >
              Etheria Systems
            </h1>
            <p
              ref={heroSubRef}
              className="text-xl md:text-2xl text-[#e0e0e0] mb-8 font-light tracking-wide drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]"
            >
              Bridging Ancient Wisdom with Modern Technology
            </p>
            <p
              ref={heroTextRef}
              className="text-[#c0c0c0] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Explore the intersection of spirituality and artificial intelligence.
              Our platforms offer unique experiences that combine mystical traditions
              with cutting-edge AI technology.
            </p>
            <div ref={heroBtnsRef} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,162,39,0.4)]"
              >
                Explore Products
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-[#c9a227] text-[#c9a227] font-cinzel tracking-wider rounded-lg transition-all duration-300 hover:bg-[#c9a227] hover:text-[#0a0a0b]"
              >
                Learn More
              </Link>
            </div>

            {/* Visitor Counter */}
            <div
              ref={counterRef}
              className="mt-8 flex items-center justify-center gap-3 text-[#c9a227]/80"
            >
              <Eye className="w-5 h-5" />
              <p className="font-cinzel text-sm tracking-wider">
                {loading ? (
                  'Counting seekers...'
                ) : (
                  <>
                    You are the{' '}
                    <span className="text-[#c9a227] font-bold text-base">{count?.toLocaleString()}</span>
                    {' '}to seek enlightenment. Welcome to Etheria Systems!
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <section className="py-24 px-6" ref={productsRef}>
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 sm:p-12">
              <h2 className="font-cinzel text-4xl text-center mb-4 text-[#f5f5f5]">Our Products</h2>
              <p className="text-[#b0b0b0] text-center mb-16 max-w-2xl mx-auto">
                Discover our suite of AI-powered spiritual tools
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={product.path}
                    className="group rounded-xl border border-white/10 transition-all duration-500 hover:border-[#c9a227]/50 overflow-hidden flex flex-col"
                  >
                    {/* Video/Image */}
                    <div className="aspect-video overflow-hidden flex-shrink-0">
                      {product.video ? (
                        <LazyVideo
                          src={product.video}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-6 bg-gradient-to-b from-[#0a0a0b]/90 to-[#0a0a0b] flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[#c9a227]">{product.icon}</span>
                        <h3 className="font-cinzel text-xl text-[#f5f5f5] group-hover:text-[#c9a227] transition-colors">
                          {product.title}
                        </h3>
                      </div>
                      {product.id !== 'etheria' && (
                        <p className="text-[#c9a227] text-xs font-cinzel tracking-widest uppercase mb-2">
                          Coming Soon
                        </p>
                      )}
                      <p className="text-[#a3a3a3] text-sm leading-relaxed">{product.description}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* More Coming Soon */}
              <div className="mt-12 p-8 border border-[#c9a227]/20 rounded-xl bg-[rgba(201,162,39,0.05)] text-center">
                <h3 className="font-cinzel text-xl text-[#c9a227] tracking-wider">
                  More Applications Coming Soon
                </h3>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 pb-24" ref={ctaRef}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-10 sm:p-12 text-center">
              <h2 className="font-cinzel text-3xl mb-6 text-[#f5f5f5]">Be Among the First</h2>
              <p className="text-[#d0d0d0] mb-8">
                Our platforms are just beginning their journey. Join our early community of seekers
                exploring the frontier where ancient wisdom meets modern AI.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,162,39,0.4)]"
              >
                Get in Touch
              </Link>
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
