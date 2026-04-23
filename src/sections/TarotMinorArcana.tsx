import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrescentGlyph } from '../components/Glyphs';

gsap.registerPlugin(ScrollTrigger);

const TarotMinorArcana: React.FC = () => {
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

      scrollTl
        .fromTo(bg, { scale: 1.14, opacity: 0.7 }, { scale: 1, opacity: 1, ease: 'none' }, 0)
        .fromTo(glyph, { opacity: 0, y: '12vh', rotate: -6 }, { opacity: 1, y: 0, rotate: 0, ease: 'power2.out' }, 0)
        .fromTo(label, { opacity: 0, y: '4vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.06)
        .fromTo(headline, { opacity: 0, y: '7vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.09)
        .fromTo(body, { opacity: 0, y: '5vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.13);

      scrollTl
        .to(bg, { scale: 1.07, opacity: 0.6, ease: 'none' }, 0.7)
        .to(glyph, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to(label, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .to(headline, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.74)
        .to(body, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.76);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[110]">
      <div ref={bgRef} className="absolute inset-0 z-[1]" style={{ opacity: 0.7 }}>
        <img src="/tarot-minor-arcana.jpg" alt="Minor Arcana" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50 z-[2]" />
      <div className="vignette z-[3]" />
      <div className="absolute bottom-1/4 left-1/3 orb orb-2 z-[4]" />
      <div className="relative z-[5] w-full h-full flex flex-col items-center justify-center px-8">
        <span ref={labelRef} className="mb-4 text-primary font-cinzel text-sm tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ opacity: 0 }}>
          02 / The Details
        </span>
        <div ref={glyphRef} className="mb-6 text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-float" style={{ opacity: 0 }}>
          <CrescentGlyph size={100} />
        </div>
        <h2 ref={headlineRef} className="font-cinzel text-[clamp(32px,5vw,56px)] font-semibold tracking-[0.1em] text-foreground text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ opacity: 0 }}>
          MINOR ARCANA
        </h2>
        <p ref={bodyRef} className="mt-6 text-center max-w-[56ch] text-foreground font-inter text-[clamp(14px,1.3vw,18px)] leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-black/40 px-6 py-4 rounded-sm" style={{ opacity: 0 }}>
          The 56 cards of everyday magic. Cups flow with emotion, Wands ignite action, Swords cut through illusion, and Pentacles ground us in the material world. Learn how these four suits weave the tapestry of daily life.
        </p>
      </div>
    </section>
  );
};

export default TarotMinorArcana;
