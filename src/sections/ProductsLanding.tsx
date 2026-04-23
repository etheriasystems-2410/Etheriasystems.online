import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Construction } from 'lucide-react';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

const ProductsLanding: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !subtitle || !grid) return;

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

      gsap.fromTo(subtitle, 
        { opacity: 0, y: 18 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.1,
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(grid, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToEtheria = () => {
    const element = document.getElementById('perceive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToArcanum = () => {
    const element = document.getElementById('arcanum-rituals');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMasteringCards = () => {
    const element = document.getElementById('tarot-major-arcana');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="products"
      className="relative z-[52] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 left-1/3 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 right-1/4 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-4"
        >
          Our Products
        </h2>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-center text-muted-foreground font-inter text-sm max-w-xl mx-auto mb-16"
        >
          Explore our suite of applications designed to bring the esoteric into your daily life.
        </p>

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Etheria - Active Product */}
          <button 
            onClick={scrollToEtheria}
            className="group relative overflow-hidden rounded-sm bg-secondary/30 border border-primary/30 hover:border-primary/60 transition-all duration-300 text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/etheria-product.jpg" 
                alt="Etheria"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-cinzel text-foreground text-xl tracking-wider mb-1 group-hover:text-primary transition-colors">
                Etheria
              </h3>
              <p className="text-foreground/60 font-inter text-xs mb-3">
                Spiritual guide to higher enlightenment
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs font-cinzel tracking-wider group-hover:gap-3 transition-all">
                Explore
                <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Arcanum Liberatus - Coming Soon */}
          <button 
            onClick={scrollToArcanum}
            className="group relative overflow-hidden rounded-sm bg-secondary/30 border border-primary/30 hover:border-primary/60 transition-all duration-300 text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="/arcanum-liberatus.jpg" 
                alt="Arcanum Liberatus"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-sm text-primary font-cinzel text-xs tracking-wider">
                Coming Soon
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-cinzel text-foreground text-xl tracking-wider mb-1 group-hover:text-primary transition-colors">
                Arcanum Liberatus
              </h3>
              <p className="text-foreground/60 font-inter text-xs mb-3">
                Unlock the secrets of the arcane
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs font-cinzel tracking-wider group-hover:gap-3 transition-all">
                Explore
                <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Mastering the Cards - Coming Soon */}
          <button 
            onClick={scrollToMasteringCards}
            className="group relative overflow-hidden rounded-sm bg-secondary/30 border border-primary/30 hover:border-primary/60 transition-all duration-300 text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <LazyVideo
                src="/mastering-video.mp4"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 rounded-sm text-purple-300 font-cinzel text-xs tracking-wider">
                Coming Soon
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-1 group-hover:text-primary transition-colors">
                Mastering the Cards
              </h3>
              <p className="text-foreground/60 font-inter text-xs mb-3">
                Read and Pathwork like a Professional
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-xs font-cinzel tracking-wider group-hover:gap-3 transition-all">
                Explore
                <ArrowRight size={14} />
              </span>
            </div>
          </button>

          {/* Placeholder 2 */}
          <div className="relative overflow-hidden rounded-sm bg-secondary/20 border border-border/50">
            <div className="aspect-[4/3] flex items-center justify-center bg-secondary/30">
              <Construction size={48} className="text-muted-foreground/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-background/80 backdrop-blur-sm">
              <h3 className="font-cinzel text-muted-foreground text-lg tracking-wider mb-1">
                Currently Under Development
              </h3>
              <p className="text-muted-foreground/50 font-inter text-xs">
                The cosmos whispers of new tools
              </p>
            </div>
          </div>

          {/* Placeholder 3 */}
          <div className="relative overflow-hidden rounded-sm bg-secondary/20 border border-border/50">
            <div className="aspect-[4/3] flex items-center justify-center bg-secondary/30">
              <Construction size={48} className="text-muted-foreground/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-background/80 backdrop-blur-sm">
              <h3 className="font-cinzel text-muted-foreground text-lg tracking-wider mb-1">
                Currently Under Development
              </h3>
              <p className="text-muted-foreground/50 font-inter text-xs">
                Ancient wisdom being digitized
              </p>
            </div>
          </div>

          {/* Placeholder 4 */}
          <div className="relative overflow-hidden rounded-sm bg-secondary/20 border border-border/50">
            <div className="aspect-[4/3] flex items-center justify-center bg-secondary/30">
              <Construction size={48} className="text-muted-foreground/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-background/80 backdrop-blur-sm">
              <h3 className="font-cinzel text-muted-foreground text-lg tracking-wider mb-1">
                Currently Under Development
              </h3>
              <p className="text-muted-foreground/50 font-inter text-xs">
                Secrets of the unseen realm
              </p>
            </div>
          </div>

          {/* Placeholder 5 */}
          <div className="relative overflow-hidden rounded-sm bg-secondary/20 border border-border/50">
            <div className="aspect-[4/3] flex items-center justify-center bg-secondary/30">
              <Construction size={48} className="text-muted-foreground/30" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-background/80 backdrop-blur-sm">
              <h3 className="font-cinzel text-muted-foreground text-lg tracking-wider mb-1">
                Currently Under Development
              </h3>
              <p className="text-muted-foreground/50 font-inter text-xs">
                The journey continues
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsLanding;
