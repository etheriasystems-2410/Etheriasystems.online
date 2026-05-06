import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoonDotGlyph } from '../components/Glyphs';

gsap.registerPlugin(ScrollTrigger);

const ArcanumMastery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const glyph = glyphRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;

    if (!section || !bg || !glyph || !label || !headline || !body) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(bg, 
          { scale: 1.12, opacity: 0.8 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(glyph, 
          { opacity: 0, y: '10vh', scale: 0.9 }, 
          { opacity: 1, y: 0, scale: 1, ease: 'power2.out' }, 
          0
        )
        .fromTo(label, 
          { opacity: 0, y: '4vh' }, 
          { opacity: 1, y: 0, ease: 'power2.out' }, 
          0.05
        )
        .fromTo(headline, 
          { opacity: 0, y: '6vh' }, 
          { opacity: 1, y: 0, ease: 'power2.out' }, 
          0.08
        )
        .fromTo(body, 
          { opacity: 0, y: '5vh' }, 
          { opacity: 1, y: 0, ease: 'power2.out' }, 
          0.12
        );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl
        .to(bg, { scale: 1.06, x: '-4vw', ease: 'none' }, 0.7)
        .to(glyph, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to(label, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .to(headline, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.74)
        .to(body, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.76);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned z-[95]"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0.8 }}
      >
        <img 
          src="/arcanum-mastery.jpg" 
          alt="Arcane mastery"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-[2]" />

      {/* Vignette */}
      <div className="vignette z-[3]" />

      {/* Orb Glows */}
      <div className="absolute top-1/3 right-1/3 orb orb-1 z-[4]" />

      {/* Content */}
      <div className="relative z-[5] w-full h-full flex flex-col items-center justify-center px-8">
        {/* Label */}
        <span 
          ref={labelRef}
          className="mb-4 text-primary font-cinzel text-sm tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ opacity: 0 }}
        >
          05 / Ascend
        </span>

        {/* Glyph */}
        <div 
          ref={glyphRef}
          className="mb-6 text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] glyph-animate"
          style={{ opacity: 0 }}
        >
          <MoonDotGlyph size={80} />
        </div>

        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="font-cinzel text-[clamp(32px,5vw,56px)] font-semibold tracking-[0.1em] text-foreground text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          style={{ opacity: 0 }}
        >
          MASTERY
        </h2>

        {/* Body */}
        <p 
          ref={bodyRef}
          className="mt-6 text-center max-w-[56ch] text-foreground font-inter text-[clamp(14px,1.3vw,18px)] leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-black/40 px-6 py-4 rounded-sm"
          style={{ opacity: 0 }}
        >
          The path of the adept is infinite. Arcanum Liberatus grows with you—new rituals, deeper spells, expanded knowledge. Your journey into the arcane has only just begun.
        </p>
      </div>
    </section>
  );
};

export default ArcanumMastery;
