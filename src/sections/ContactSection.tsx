import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Facebook, Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const links = linksRef.current;

    if (!section || !form || !links) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(form, 
        { opacity: 0, y: 22 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(links, 
        { opacity: 0, y: 16 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          delay: 0.2,
          scrollTrigger: {
            trigger: links,
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
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className="relative z-[70] bg-background py-24 md:py-32"
    >
      {/* Orb Glows */}
      <div className="absolute top-1/3 right-1/4 orb orb-3 opacity-40" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-12">
        {/* Form Block */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="text-center"
        >
          <h2 className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground mb-4">
            Begin
          </h2>
          <p className="text-muted-foreground font-inter text-sm mb-10">
            Questions, collaborations, or just saying hello—reach out.
          </p>

          <div className="space-y-4 mb-8">
            <input 
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <input 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-sm text-foreground placeholder:text-muted-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <button 
            type="submit"
            className="btn-primary inline-flex items-center gap-2"
          >
            {sent ? 'Message sent!' : 'Send message'}
            <Send size={14} />
          </button>
        </form>

        {/* Hairline */}
        <div className="hairline my-12" />

        {/* Links */}
        <div 
          ref={linksRef}
          className="text-center"
        >
          <a 
            href="mailto:etheriasystems@gmail.com"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors font-inter text-sm mb-8"
          >
            <Mail size={16} />
            etheriasystems@gmail.com
          </a>

          <div className="flex justify-center gap-6 mb-12">
            <a 
              href="https://www.facebook.com/share/1aPhA3bPRX/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://wa.me/16152603626"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="WhatsApp Business"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Footer */}
          <p className="text-muted-foreground/60 font-inter text-xs">
            © Etheria Systems. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;