import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoonDotGlyph } from '../components/Glyphs';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const glyph = glyphRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;

    if (!section || !bg || !content || !glyph || !headline || !subhead || !cta) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      loadTl
        .fromTo(bg, 
          { opacity: 0, scale: 1.06 }, 
          { opacity: 1, scale: 1, duration: 1.1 }
        )
        .fromTo(glyph, 
          { opacity: 0, y: -18, scale: 0.96 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 
          0.2
        )
        .fromTo(headline, 
          { opacity: 0, y: 18 }, 
          { opacity: 1, y: 0, duration: 0.8 }, 
          0.4
        )
        .fromTo(subhead, 
          { opacity: 0, y: 14 }, 
          { opacity: 1, y: 0, duration: 0.7 }, 
          0.55
        )
        .fromTo(cta, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, duration: 0.7 }, 
          0.7
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([bg, glyph, headline, subhead, cta], { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              x: 0 
            });
          }
        }
      });

      // ENTRANCE (0-30%): Hold at visible state (load animation handled this)
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(headline, 
          { y: 0, opacity: 1 }, 
          { y: '-22vh', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(subhead, 
          { y: 0, opacity: 1 }, 
          { y: '-18vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(cta, 
          { y: 0, opacity: 1 }, 
          { y: '-14vh', opacity: 0, ease: 'power2.in' }, 
          0.74
        )
        .fromTo(glyph, 
          { y: 0, opacity: 1 }, 
          { y: '-10vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        )
        .fromTo(bg, 
          { scale: 1, x: 0 }, 
          { scale: 1.08, x: '-3vw', ease: 'none' }, 
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img 
          src="/hero-energy-figure.jpg" 
          alt="Mystical energy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette */}
      <div className="vignette z-[3]" />

      {/* Orb Glows */}
      <div className="absolute top-1/4 left-1/4 orb orb-1 z-[4]" />
      <div className="absolute bottom-1/3 right-1/4 orb orb-2 z-[4]" />

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-[5] w-full h-full flex flex-col items-center justify-center px-8"
      >
        {/* Glyph */}
        <div 
          ref={glyphRef}
          className="mb-6 text-foreground/85 glyph-animate"
          style={{ opacity: 0 }}
        >
          <MoonDotGlyph size={80} />
        </div>

        {/* Headline */}
        <div 
          ref={headlineRef}
          className="text-center"
          style={{ opacity: 0 }}
        >
          <h1 className="font-cinzel text-[clamp(32px,5vw,64px)] font-semibold tracking-[0.1em] text-foreground">
            ETHERIA SYSTEMS
          </h1>
        </div>

        {/* Subheadline */}
        <p 
          ref={subheadRef}
          className="mt-6 text-center max-w-[60ch] text-foreground/80 font-inter text-[clamp(14px,1.3vw,18px)] leading-relaxed tracking-wide"
          style={{ opacity: 0 }}
        >
          A solo venture into the microcosm, macrocosm, and esoteric which strives to make these worlds accessible to anyone with just the opening of a phone application.
        </p>

        {/* CTA */}
        <div 
          ref={ctaRef}
          className="mt-10 flex flex-col items-center gap-4"
          style={{ opacity: 0 }}
        >
          <a href="#products" className="btn-primary">
            Explore our products
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
