import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrescentGlyph } from '../components/Glyphs';

gsap.registerPlugin(ScrollTrigger);

const ReceiveSection: React.FC = () => {
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
          { scale: 1.10, y: '-4vh' }, 
          { scale: 1, y: 0, ease: 'none' }, 
          0
        )
        .fromTo(glyph, 
          { opacity: 0, scale: 0.85, y: '10vh' }, 
          { opacity: 1, scale: 1, y: 0, ease: 'power2.out' }, 
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
        .to(bg, { scale: 1.06, y: '3vh', ease: 'none' }, 0.7)
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
      className="section-pinned z-40"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-[1]"
      >
        <img 
          src="/crescent-dream-figure.jpg" 
          alt="Crescent moon dream"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette */}
      <div className="vignette z-[3]" />

      {/* Orb Glows */}
      <div className="absolute top-1/3 left-1/4 orb orb-3 z-[4]" />

      {/* Content */}
      <div className="relative z-[5] w-full h-full flex flex-col items-center justify-center px-8">
        {/* Label */}
        <span 
          ref={labelRef}
          className="mb-4 text-primary/70 font-cinzel text-sm tracking-[0.2em]"
          style={{ opacity: 0 }}
        >
          03 / Listen
        </span>

        {/* Glyph */}
        <div 
          ref={glyphRef}
          className="mb-6 text-foreground/85 glyph-animate"
          style={{ opacity: 0 }}
        >
          <CrescentGlyph size={100} />
        </div>

        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="font-cinzel text-[clamp(32px,5vw,56px)] font-semibold tracking-[0.1em] text-foreground text-center"
          style={{ opacity: 0 }}
        >
          RECEIVE
        </h2>

        {/* Body */}
        <p 
          ref={bodyRef}
          className="mt-6 text-center max-w-[56ch] text-foreground/75 font-inter text-[clamp(13px,1.2vw,17px)] leading-relaxed tracking-wide"
          style={{ opacity: 0 }}
        >
          Wisdom arrives in stillness. Etheria creates space to listen—so you can recognize what is true, and let it shape your next step.
        </p>
      </div>
    </section>
  );
};

export default ReceiveSection;
