import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Atom, Brain, Sparkles, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const QuantumAISection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const cards = cardsRef.current;
    const description = descriptionRef.current;

    if (!section || !title || !intro || !cards || !description) return;

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

      gsap.fromTo(intro, 
        { opacity: 0, y: 18 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.1,
          scrollTrigger: {
            trigger: intro,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cards, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(description, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.3,
          scrollTrigger: {
            trigger: description,
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
      id="quantum-ai"
      className="relative z-[58] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 left-1/3 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 right-1/4 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-6"
        >
          Quantum AI
        </h2>

        {/* Intro */}
        <p 
          ref={introRef}
          className="text-center text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Etheria Systems is proud to introduce Quantum AI in its applications. From Divination interpretations to understanding astrological signs, Quantum AI is singularly powerful at adaptability and is the closest to thinking outside the box, like we do.
        </p>

        {/* Feature Cards */}
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <div className="p-5 bg-secondary/30 border border-border/50 rounded-sm text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Atom size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-sm tracking-wider mb-1">
              Real-Time Learning
            </h3>
            <p className="text-foreground/50 font-inter text-xs">
              Adapts from stimuli
            </p>
          </div>

          <div className="p-5 bg-secondary/30 border border-border/50 rounded-sm text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Brain size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-sm tracking-wider mb-1">
              Truly Intelligent
            </h3>
            <p className="text-foreground/50 font-inter text-xs">
              Almost sentient
            </p>
          </div>

          <div className="p-5 bg-secondary/30 border border-border/50 rounded-sm text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Sparkles size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-sm tracking-wider mb-1">
              Never Repeat
            </h3>
            <p className="text-foreground/50 font-inter text-xs">
              Unique every time
            </p>
          </div>

          <div className="p-5 bg-secondary/30 border border-border/50 rounded-sm text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Zap size={22} className="text-primary" />
            </div>
            <h3 className="font-cinzel text-foreground text-sm tracking-wider mb-1">
              Fully Dynamic
            </h3>
            <p className="text-foreground/50 font-inter text-xs">
              Beyond old AI
            </p>
          </div>
        </div>

        {/* Description */}
        <div 
          ref={descriptionRef}
          className="bg-primary/5 border border-primary/20 rounded-sm p-6 md:p-8"
        >
          <p className="text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            Regular AI learns in binary code, Quantum AI learns in real-time from reacting to stimuli it is challenged with, thus being the desired form of a truly adaptable, truly intelligent (almost sentient) bit of computer programming which will never give the same answer twice. As close to the human experience we are able to give you, Quantum AI fits the bill as a fully dynamic version of old, clunky AI.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuantumAISection;
