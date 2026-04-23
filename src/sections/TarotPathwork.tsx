import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EyeGlyph } from '../components/Glyphs';

gsap.registerPlugin(ScrollTrigger);

const TarotPathwork: React.FC = () => {
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
        .fromTo(bg, { scale: 1.10, y: '-4vh' }, { scale: 1, y: 0, ease: 'none' }, 0)
        .fromTo(glyph, { opacity: 0, scale: 0.85, y: '10vh' }, { opacity: 1, scale: 1, y: 0, ease: 'power2.out' }, 0)
        .fromTo(label, { opacity: 0, y: '4vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.05)
        .fromTo(headline, { opacity: 0, y: '6vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.08)
        .fromTo(body, { opacity: 0, y: '5vh' }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.12);

      scrollTl
        .to(bg, { scale: 1.06, y: '3vh', ease: 'none' }, 0.7)
        .to(glyph, { y: '-12vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .to(label, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .to(headline, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.74)
        .to(body, { y: '-8vh', opacity: 0, ease: 'power2.in' }, 0.76);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-[115]">
      <div ref={bgRef} className="absolute inset-0 z-[1]">
        <img src="/tarot-pathwork.jpg" alt="Pathworking" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/50 z-[2]" />
      <div className="vignette z-[3]" />
      <div className="absolute top-1/3 left-1/4 orb orb-3 z-[4]" />
      <div className="relative z-[5] w-full h-full flex flex-col items-center justify-center px-8">
        <span ref={labelRef} className="mb-4 text-primary font-cinzel text-sm tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ opacity: 0 }}>
          03 / Transcend
        </span>
        <div ref={glyphRef} className="mb-6 text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] glyph-animate" style={{ opacity: 0 }}>
          <EyeGlyph size={100} />
        </div>
        <h2 ref={headlineRef} className="font-cinzel text-[clamp(32px,5vw,56px)] font-semibold tracking-[0.1em] text-foreground text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ opacity: 0 }}>
          PATHWORKING
        </h2>
        <p ref={bodyRef} className="mt-6 text-center max-w-[56ch] text-foreground font-inter text-[clamp(14px,1.3vw,18px)] leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-black/40 px-6 py-4 rounded-sm" style={{ opacity: 0 }}>
          Step through the card and into another realm. Pathworking is the art of guided meditation through tarot imagery—enter the scene, meet the archetypes, and return transformed. A journey beyond the physical into the symbolic.
        </p>
      </div>
    </section>
  );
};

export default TarotPathwork;
