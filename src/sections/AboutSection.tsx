import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;
    const portrait = portraitRef.current;
    const newsletter = newsletterRef.current;

    if (!section || !title || !text || !portrait || !newsletter) return;

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

      // Text animation
      gsap.fromTo(text, 
        { opacity: 0, y: 18 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.1,
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Portrait animation
      gsap.fromTo(portrait, 
        { opacity: 0, x: 40, scale: 0.98 }, 
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: portrait,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Newsletter animation
      gsap.fromTo(newsletter, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.3,
          scrollTrigger: {
            trigger: newsletter,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="about"
      className="relative z-[60] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 left-1/4 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 right-1/3 orb orb-2 opacity-40" />

      <div 
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-12"
      >
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-8"
        >
          About Etheria Systems
        </h2>

        {/* Mystical Banner Image */}
        <div className="relative overflow-hidden rounded-sm mb-16">
          <img 
            src="/about-mystical.jpg" 
            alt="Mystical Egyptian deity with cosmic symbols"
            className="w-full aspect-[16/9] object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Main Content */}
        <div ref={textRef} className="space-y-8">
          <p className="text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            We are a small company of one person, but we have our sights set on the edges of the universe! We at Etheria Systems strive to place in the palm of your hand all the tools and studies you may ever need to learn about all things spiritual, mystical, magical, and esoteric.
          </p>

          <p className="text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            We believe that one shouldn't have to search high and low for information which can help bring enlightenment to a seeker of knowledge.
          </p>

          {/* Subscription Info */}
          <div className="bg-secondary/30 border border-border/50 rounded-sm p-6 md:p-8">
            <h3 className="font-cinzel text-foreground text-lg tracking-wider mb-4">
              Subscription Model
            </h3>
            <p className="text-foreground/70 font-inter text-sm leading-relaxed mb-4">
              With that being said though, all of our applications do require a very manageable monthly subscription fee in order to access all the features that our applications have to offer. Remember, we are one man and this small, manageable fee will go to nothing but our overhead costs, developer application subscriptions, and running costs for the applications being used.
            </p>
            <p className="text-primary font-cinzel text-sm tracking-wider">
              Truly, you will never see a price above $3.99 per month on any application we produce.
            </p>
          </div>

          <p className="text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed">
            If you wish to remain a free user, every application will have tools you can use, but you will be greatly restricted on what features you may access.
          </p>

          {/* Bi-Weekly Contest */}
          <div className="bg-primary/5 border border-primary/20 rounded-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-primary" />
              <h3 className="font-cinzel text-primary text-lg tracking-wider">
                Bi-Weekly Contest Drawing
              </h3>
            </div>
            <p className="text-foreground/70 font-inter text-sm leading-relaxed mb-4">
              For those who are short on funds, don't worry. We have all been (or still are) in your position. The founder of ES knows what it's like to have to make difficult decisions like, "Do I eat, or do I put gas in my vehicle?"
            </p>
            <p className="text-foreground/70 font-inter text-sm leading-relaxed">
              This is why every mobile application developed by us has a Bi-Weekly contest drawing which all users are recommended to enter. Performed entirely by quantum AI, users who have met the qualification threshold are entered into the quantum database and a random winner is selected and emailed a code worth one free month of premium access.
            </p>
            <p className="text-foreground/60 font-inter text-sm leading-relaxed mt-4 italic">
              You can enter as many times as you'd like. If you are a paying member already, you may use the code yourself and skip a monthly subscription fee or gift the code to someone less fortunate.
            </p>

            {/* Warning */}
            <div className="mt-6 pt-6 border-t border-destructive/30">
              <p className="text-destructive font-inter text-sm leading-relaxed">
                Selling of the code by the winning party to another party is despicable and punishable by membership revocation (if applicable), temporary bans from the application and/or complete termination of application privileges and deletion of your member information from our database.
              </p>
              <p className="text-destructive font-cinzel text-sm tracking-wider mt-3 font-semibold">
                YOU HAVE BEEN WARNED!
              </p>
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="hairline my-16" />

        {/* Two Column: Creator + Portrait */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Left: About the Creator */}
          <div>
            <div className="border-l-2 border-primary/30 pl-5">
              <p className="font-cinzel text-primary text-sm tracking-[0.15em] mb-3">
                About the Creator
              </p>
              <p className="text-foreground/70 font-inter text-sm leading-relaxed mb-4">
                As Founder, CEO, CFO, Marketing Manager, and sole developer, it has always been R. Williams's motto to not simply "Reach for the Stars", but to pass them and reach the edge of the universe and beyond. His ambition is the driving steam behind the products we provide to help those who are seeking their own knowledge of those who wish to continue on their personal path to enlightenment. We are not a religious company, but you will here talk of religious figures and spirits in the form of the esoteric, mystical, and magical.
              </p>
              <p className="text-foreground/70 font-inter text-sm leading-relaxed mb-4">
                After all, depending on what mysteries and histories you subscribe to, King Solomon was a powerful magician who controlled legions of demonic forces and forced them to build his palace. Look it up....
              </p>
              <p className="text-foreground/70 font-inter text-sm leading-relaxed">
                R. Williams is a proud pagan who follows Egyptian Gods, loves Mexican food, and is deathly terrified of clowns.
              </p>
            </div>
          </div>

          {/* Right: Portrait Card */}
          <div 
            ref={portraitRef}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-sm bg-secondary/30 border border-border/50">
              <img 
                src="/founder-portrait.jpg" 
                alt="R. Williams - Founder"
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-cinzel text-foreground text-lg tracking-wider">
                  R. Williams
                </p>
                <p className="text-muted-foreground font-inter text-sm mt-1">
                  Founder & Developer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="hairline mb-16" />

        {/* Newsletter */}
        <div 
          ref={newsletterRef}
          className="text-center"
        >
          <p className="font-cinzel text-primary text-sm tracking-[0.15em] mb-2">
            Field Notes
          </p>
          <p className="text-muted-foreground font-inter text-sm mb-6">
            One email a month. Practices, updates, and quiet insights.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-primary/10 border border-primary/30 text-primary rounded-sm font-cinzel text-sm tracking-wider hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
