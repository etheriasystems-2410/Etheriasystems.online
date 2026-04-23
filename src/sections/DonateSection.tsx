import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Gift, Mail, Send, Calendar, User, AppWindow, AtSign } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DonateSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    application: '',
    username: '',
    email: '',
    donationDate: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const embed = embedRef.current;
    const offer = offerRef.current;
    const form = formRef.current;

    if (!section || !title || !intro || !embed || !offer || !form) return;

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

      gsap.fromTo(embed, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: embed,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(offer, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.3,
          scrollTrigger: {
            trigger: offer,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(form, 
        { opacity: 0, y: 20 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.4,
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const body = `Application: ${formData.application}
Username: ${formData.username}
Email used to sign up: ${formData.email}
Date of donation: ${formData.donationDate}`;

    const mailtoLink = `mailto:etheriasystems@gmail.com?subject=I donated!&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section 
      ref={sectionRef} 
      id="donate"
      className="relative z-[65] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-20 right-1/3 orb orb-1 opacity-50" />
      <div className="absolute bottom-40 left-1/4 orb orb-2 opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 
          ref={titleRef}
          className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-6"
        >
          Donate
        </h2>

        {/* Mystical Banner Image */}
        <div className="relative overflow-hidden rounded-sm mb-10">
          <img 
            src="/donate-mystical.jpg" 
            alt="Magical donation altar with crystals and cosmic light"
            className="w-full aspect-[16/9] object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        {/* Intro */}
        <p 
          ref={introRef}
          className="text-center text-foreground/80 font-inter text-[clamp(14px,1.1vw,17px)] leading-relaxed max-w-2xl mx-auto mb-12"
        >
          If you feel compelled, you can also donate to Etheria Systems's GoFundMe to help cover costs if you choose not to purchase an application subscription.
        </p>

        {/* GoFundMe Link */}
        <div 
          ref={embedRef}
          className="mb-12"
        >
          <a 
            href="https://gofund.me/50f1cab7d"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative overflow-hidden rounded-sm border border-border/50 group-hover:border-primary/50 transition-colors">
              <img 
                src="/gofundme-banner.png" 
                alt="Donate to Help Etheria Systems Bring Magic to Mobile Apps"
                className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
          <p className="text-center mt-4">
            <a 
              href="https://gofund.me/50f1cab7d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-cinzel text-sm tracking-wider hover:underline"
            >
              <Heart size={16} />
              View on GoFundMe
            </a>
          </p>
        </div>

        {/* Special Offer */}
        <div 
          ref={offerRef}
          className="bg-primary/5 border border-primary/20 rounded-sm p-6 md:p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gift size={24} className="text-primary" />
            <h3 className="font-cinzel text-primary text-lg tracking-wider">
              Lifetime Membership Offer
            </h3>
          </div>
          
          <p className="text-foreground/80 font-inter text-sm leading-relaxed mb-4">
            Of course, any amount helps greatly, but if you donate over $100 and then contact me through my website stating your handle and when you made the donation, I will send you a code valid for a lifetime unlimited membership to the application of your choice as my sincere thanks.
          </p>
          
          <div className="flex items-start gap-3 bg-background/50 rounded-sm p-4">
            <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-foreground/70 font-inter text-sm leading-relaxed">
              You must use the form below to report on a donation made. Using any other contact method on this website will not guarantee I will see your email and issue the code. Thanks for your support!
            </p>
          </div>
        </div>

        {/* Email Form */}
        <div 
          ref={formRef}
          className="bg-secondary/30 border border-border/50 rounded-sm p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Send size={22} className="text-primary" />
            <h3 className="font-cinzel text-foreground text-lg tracking-wider">
              Claim Your Lifetime Membership
            </h3>
          </div>

          <p className="text-muted-foreground font-inter text-sm mb-6">
            Fill out this form to email us your donation details. The subject line will be set automatically.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-foreground/80 font-inter text-sm mb-2">
                <AppWindow size={16} className="text-primary/70" />
                Application you want access to
              </label>
              <input 
                type="text"
                required
                value={formData.application}
                onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                placeholder="e.g., Etheria"
                className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-foreground/80 font-inter text-sm mb-2">
                <User size={16} className="text-primary/70" />
                Your username in the application
              </label>
              <input 
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Your username"
                className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-foreground/80 font-inter text-sm mb-2">
                <AtSign size={16} className="text-primary/70" />
                Email you used to sign up
              </label>
              <input 
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-foreground/80 font-inter text-sm mb-2">
                <Calendar size={16} className="text-primary/70" />
                Date the donation was made
              </label>
              <input 
                type="date"
                required
                value={formData.donationDate}
                onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-sm">
                <Mail size={16} className="text-primary" />
                <span className="text-primary font-inter text-sm">
                  Subject: <strong>I donated!</strong>
                </span>
              </div>

              <button 
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Email to etheriasystems@gmail.com
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DonateSection;
