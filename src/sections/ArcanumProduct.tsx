import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Gem, BookOpen, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ArcanumProduct: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;

    if (!section || !title || !desc || !features || !cta) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(title, 
        { opacity: 0, y: 24 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(desc, 
        { opacity: 0, y: 18 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.1,
          scrollTrigger: {
            trigger: desc,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(features, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: features,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cta, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.3,
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="arcanum-product"
      className="relative z-[100] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 right-1/4 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 left-1/3 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-2"
        >
          Arcanum Liberatus
        </h2>

        {/* Coming Soon Badge */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 bg-purple-500/20 border border-purple-400/50 rounded-sm font-cinzel text-purple-300 text-sm tracking-[0.2em] animate-pulse drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Coming Soon
          </span>
        </div>

        {/* Product Description */}
        <p 
          ref={descRef}
          className="text-center text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Unlock the secrets of the arcane. Your comprehensive magical companion for rituals, spells, crystal wisdom, and AI-powered divination.
        </p>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Sacred Rituals
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Step-by-step guidance through powerful ceremonies of intent, manifestation, and transformation.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Quantum Grimoire
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              AI-assisted spell creation accounting for planetary hours, moon phases, and elemental correspondences.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Gem size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Crystal Glossary
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Comprehensive guide to Earth's living treasures—properties, uses, and the energies each crystal channels.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Eye size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Quantum Tarot
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Full-spread readings with AI interpretation—blending ancient symbolism with adaptive intelligence.
            </p>
          </div>
        </div>

        {/* And Much More */}
        <div className="text-center mb-12">
          <div className="inline-block px-8 py-4 bg-primary/10 border border-primary/30 rounded-sm">
            <p className="font-cinzel text-primary text-lg tracking-[0.15em]">
              And Much, Much More...
            </p>
          </div>
        </div>

        {/* CTA */}
        <div 
          ref={ctaRef}
          className="text-center"
        >
          <button className="btn-primary">
            Coming Soon
          </button>
          <p className="text-muted-foreground text-xs tracking-wider font-inter mt-4">
            Available on Android
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArcanumProduct;
