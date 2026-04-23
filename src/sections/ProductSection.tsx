import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Brain, Eye, Zap, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProductSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const comingSoonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const features = featuresRef.current;
    const cta = ctaRef.current;
    const comingSoon = comingSoonRef.current;

    if (!section || !title || !desc || !features || !cta || !comingSoon) return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // Description animation
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

      // Features animation
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

      // CTA animation
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

      // Coming soon animation
      gsap.fromTo(comingSoon, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.4,
          scrollTrigger: {
            trigger: comingSoon,
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
      id="product"
      className="relative z-[55] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 right-1/4 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 left-1/3 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-6"
        >
          Etheria
        </h2>

        {/* Product Description */}
        <p 
          ref={descRef}
          className="text-center text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed max-w-2xl mx-auto mb-12"
        >
          A spiritual guide to higher enlightenment and a daily practical tool in recognizing, nourishing, and developing natural and latent psychic abilities.
        </p>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Eye size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Perception
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Train your attention to notice the subtle: impressions, patterns, and the quiet knowing beneath thought.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Brain size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Development
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Daily micro-practices designed to nourish and develop your natural psychic abilities over time.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Enlightenment
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              A guided path toward higher consciousness and deeper understanding of the esoteric realms.
            </p>
          </div>

          <div className="p-6 bg-secondary/30 border border-border/50 rounded-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-2">
              Practice
            </h3>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed">
              Simple, effective rituals that fit into your daily routine—just 5 to 15 minutes a day.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div 
          ref={ctaRef}
          className="text-center mb-20"
        >
          <button className="btn-primary">
            Download the App
          </button>
          <p className="text-muted-foreground text-xs tracking-wider font-inter mt-4">
            Available on Android
          </p>
        </div>

        {/* Hairline */}
        <div className="hairline mb-16" />

        {/* Coming Soon */}
        <div 
          ref={comingSoonRef}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <Clock size={20} className="text-primary/70" />
            <span className="font-cinzel text-primary text-sm tracking-[0.15em]">
              Coming Soon
            </span>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-4 bg-secondary/20 border border-border/30 rounded-sm">
              <p className="text-foreground/80 font-inter text-sm">
                <span className="text-primary font-cinzel">Zodiac Charts:</span> View your accurate zodiac birth chart and have it interpreted
              </p>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border/30 rounded-sm">
              <p className="text-foreground/80 font-inter text-sm">
                <span className="text-primary font-cinzel">Comprehensive Glossaries:</span> Angels, Demons, Spirits, Herbs, and Crystals
              </p>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border/30 rounded-sm">
              <p className="text-foreground/80 font-inter text-sm">
                <span className="text-primary font-cinzel">Spiritualism:</span> Speak to past loved ones
              </p>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border/30 rounded-sm">
              <p className="text-foreground/80 font-inter text-sm">
                <span className="text-primary font-cinzel">Quantum Grimoire:</span> AI-assisted ritual and spell creator—automatically accounts for planetary hours, ruling powers, astrological positions, teutonic tides, moon phases, and more. Remove the guesswork and all the cross-referencing.
              </p>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border/30 rounded-sm">
              <p className="text-foreground/80 font-inter text-sm">
                <span className="text-primary font-cinzel">Learning the Tarot:</span> Master every card's meaning and learn how to pathwork
              </p>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-sm">
              <p className="text-primary font-cinzel text-sm text-center">
                And so much, much more is on its way...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
