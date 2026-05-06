import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Sparkles, Eye, Layers, History } from 'lucide-react';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

const MasteringCardsProduct: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const badge = badgeRef.current;
    const desc = descRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !badge || !desc || !features || !cta) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: title, start: 'top 80%', toggleActions: 'play none none reverse' }});
      gsap.fromTo(badge, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, scrollTrigger: { trigger: badge, start: 'top 80%', toggleActions: 'play none none reverse' }});
      gsap.fromTo(desc, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, scrollTrigger: { trigger: desc, start: 'top 80%', toggleActions: 'play none none reverse' }});
      gsap.fromTo(features, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, scrollTrigger: { trigger: features, start: 'top 80%', toggleActions: 'play none none reverse' }});
      gsap.fromTo(cta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, scrollTrigger: { trigger: cta, start: 'top 85%', toggleActions: 'play none none reverse' }});
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mastering-cards" className="relative z-[130] bg-background py-24 md:py-32">
      <div className="absolute top-20 right-1/4 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 left-1/3 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Full-Page Product Video Banner */}
        <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 h-[80vh] overflow-hidden mb-10">
          <LazyVideo
            src="/mastering-video.mp4"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <h2 ref={titleRef} className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-2">
          Mastering the Cards
        </h2>

        <div ref={badgeRef} className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-400/50 rounded-sm font-cinzel text-purple-300 text-sm tracking-[0.2em] animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Coming Soon
          </span>
        </div>

        <p ref={descRef} className="text-center text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed max-w-2xl mx-auto mb-12">
          Read and Pathwork like a Professional. Your complete guide to tarot mastery—from the first shuffle to expert-level interpretations.
        </p>

        <div ref={featuresRef} className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">Major & Minor Arcana</h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">Master all 78 cards—the 22 archetypal majors and the 56 suit cards of daily life.</p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Eye size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">Pathworking</h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">Learn guided meditation techniques to enter the cards and meet the archetypes within.</p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Layers size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">Expert Spreads</h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">From simple three-card pulls to the masterful Celtic Cross and beyond.</p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">Deep Knowledge</h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">Learn the cards inside and out—symbolism, numerology, elemental correspondences.</p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm sm:col-span-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
              <History size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2 text-center">Lore & History</h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed text-center">Discover the rich tapestry of tarot's evolution—from Egyptian mysteries to Renaissance courts to modern divination.</p>
          </div>
        </div>

        <div ref={ctaRef} className="text-center">
          <button className="btn-primary">Coming Soon</button>
          <p className="text-muted-foreground text-xs tracking-wider font-inter mt-4">Available on Android</p>
        </div>
      </div>
    </section>
  );
};

export default MasteringCardsProduct;
