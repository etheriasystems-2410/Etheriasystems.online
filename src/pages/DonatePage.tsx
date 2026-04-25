import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Gift, Mail, Send, Calendar, User, AppWindow, AtSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

/* ── Glass Card wrapper ─────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function DonatePage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const gofundRef = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    application: '',
    username: '',
    email: '',
    donationDate: ''
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });

      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.15,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });

      [gofundRef, offerRef, formRef, thanksRef].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { opacity: 0, y: 25 }, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Application: ${formData.application}\nUsername: ${formData.username}\nEmail used to sign up: ${formData.email}\nDate of donation: ${formData.donationDate}`;
    const mailtoLink = `mailto:etheriasystems@gmail.com?subject=I donated!&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="relative min-h-screen">
      {/* ═════ FIXED FULL-PAGE VIDEO BACKGROUND ═════ */}
      <LazyVideo
        hero
        src="./donate-hero-video.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.6)' }}
      />

      {/* Optional dark overlay for extra readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-0 pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-[70vh] flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <Heart className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
            <h1 ref={heroTitleRef} className="font-cinzel text-5xl md:text-7xl mb-6 text-[#f5f5f5] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Support Our Mission
            </h1>
            <p ref={heroSubRef} className="text-xl md:text-2xl text-[#e0e0e0] max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              Your contributions help us continue bridging ancient wisdom with modern technology
            </p>
          </div>
        </section>

        {/* ── Why Donate ── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-cinzel text-3xl md:text-4xl text-center mb-12 text-[#f5f5f5] drop-shadow-lg">
              Why Donate?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div ref={card1Ref}>
                <GlassCard className="p-8 text-center transition-all duration-300 hover:border-[#c9a227]/50 hover:bg-black/50 h-full">
                  <Gift className="w-12 h-12 text-[#c9a227] mx-auto mb-4" />
                  <h3 className="font-cinzel text-xl mb-3 text-[#f5f5f5]">Preserve Wisdom</h3>
                  <p className="text-[#d0d0d0]">
                    Help us digitize and preserve ancient spiritual texts and traditions
                    for future generations.
                  </p>
                </GlassCard>
              </div>

              <div ref={card2Ref}>
                <GlassCard className="p-8 text-center transition-all duration-300 hover:border-[#c9a227]/50 hover:bg-black/50 h-full">
                  <Heart className="w-12 h-12 text-[#c9a227] mx-auto mb-4" />
                  <h3 className="font-cinzel text-xl mb-3 text-[#f5f5f5]">Fuel Innovation</h3>
                  <p className="text-[#d0d0d0]">
                    Support the development of new AI technologies that make spiritual
                    wisdom more accessible.
                  </p>
                </GlassCard>
              </div>

              <div ref={card3Ref}>
                <GlassCard className="p-8 text-center transition-all duration-300 hover:border-[#c9a227]/50 hover:bg-black/50 h-full">
                  <Heart className="w-12 h-12 text-[#c9a227] mx-auto mb-4" />
                  <h3 className="font-cinzel text-xl mb-3 text-[#f5f5f5]">Keep It Free</h3>
                  <p className="text-[#d0d0d0]">
                    Your donations help us keep our basic services free for everyone
                    who seeks spiritual guidance.
                  </p>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* ── GoFundMe ── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto" ref={gofundRef}>
            <GlassCard className="p-8 md:p-10">
              <h2 className="font-cinzel text-2xl md:text-3xl text-center mb-6 text-[#f5f5f5]">
                Donate via GoFundMe
              </h2>
              <p className="text-center text-[#d0d0d0] mb-8 max-w-2xl mx-auto">
                If you feel compelled, you can donate to Etheria Systems' GoFundMe to help cover costs
                if you choose not to purchase an application subscription.
              </p>
              <a
                href="https://gofund.me/50f1cab7d"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 group-hover:border-[#c9a227]/50 transition-colors">
                  <img
                    src="/gofundme-banner.png"
                    alt="Donate to Help Etheria Systems Bring Magic to Mobile Apps"
                    className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </a>
              <p className="text-center mt-4">
                <a
                  href="https://gofund.me/50f1cab7d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#c9a227] font-cinzel text-sm tracking-wider hover:underline"
                >
                  <Heart size={16} />
                  View on GoFundMe
                </a>
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ── Lifetime Membership Offer ── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto" ref={offerRef}>
            <GlassCard className="p-8 md:p-10 border-[#c9a227]/20">
              <div className="flex items-center gap-3 mb-4">
                <Gift size={24} className="text-[#c9a227]" />
                <h3 className="font-cinzel text-[#c9a227] text-lg md:text-xl tracking-wider">
                  Lifetime Membership Offer
                </h3>
              </div>
              <p className="text-[#d0d0d0] font-inter text-sm md:text-base leading-relaxed mb-6">
                Any amount helps greatly, but if you donate over $100 and then contact me through
                the form below stating your handle and when you made the donation, I will send you
                a code valid for a lifetime unlimited membership to the application of your choice
                as my sincere thanks.
              </p>
              <div className="flex items-start gap-3 bg-black/30 rounded-xl p-4 border border-white/5">
                <Mail size={18} className="text-[#c9a227] mt-0.5 flex-shrink-0" />
                <p className="text-[#c0c0c0] font-inter text-sm leading-relaxed">
                  You must use the form below to report on a donation made. Using any other contact
                  method on this website will not guarantee I will see your email and issue the code.
                  Thanks for your support!
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Claim Form ── */}
        <section className="py-12 px-6 pb-24">
          <div className="max-w-4xl mx-auto" ref={formRef}>
            <GlassCard className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Send size={22} className="text-[#c9a227]" />
                <h3 className="font-cinzel text-[#f5f5f5] text-lg md:text-xl tracking-wider">
                  Claim Your Lifetime Membership
                </h3>
              </div>
              <p className="text-[#b0b0b0] font-inter text-sm mb-6">
                Fill out this form to email us your donation details. The subject line will be set automatically.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-[#e0e0e0] font-inter text-sm mb-2">
                    <AppWindow size={16} className="text-[#c9a227]/70" />
                    Application you want access to
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.application}
                    onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    placeholder="e.g., Etheria"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-[#f5f5f5] placeholder:text-[#6b6b8a] font-inter text-sm focus:outline-none focus:border-[#c9a227]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[#e0e0e0] font-inter text-sm mb-2">
                    <User size={16} className="text-[#c9a227]/70" />
                    Your username in the application
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Your username"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-[#f5f5f5] placeholder:text-[#6b6b8a] font-inter text-sm focus:outline-none focus:border-[#c9a227]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[#e0e0e0] font-inter text-sm mb-2">
                    <AtSign size={16} className="text-[#c9a227]/70" />
                    Email you used to sign up
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-[#f5f5f5] placeholder:text-[#6b6b8a] font-inter text-sm focus:outline-none focus:border-[#c9a227]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[#e0e0e0] font-inter text-sm mb-2">
                    <Calendar size={16} className="text-[#c9a227]/70" />
                    Date the donation was made
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.donationDate}
                    onChange={(e) => setFormData({ ...formData, donationDate: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-[#f5f5f5] placeholder:text-[#6b6b8a] font-inter text-sm focus:outline-none focus:border-[#c9a227]/50 transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[#c9a227]/5 border border-[#c9a227]/20 rounded-lg">
                    <Mail size={16} className="text-[#c9a227]" />
                    <span className="text-[#c9a227] font-inter text-sm">
                      Subject: <strong>I donated!</strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel font-semibold tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Send Email to etheriasystems@gmail.com
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        </section>

        {/* ── Thank You ── */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto" ref={thanksRef}>
            <GlassCard className="p-10 text-center">
              <Heart className="w-12 h-12 text-[#c9a227] mx-auto mb-6" />
              <h2 className="font-cinzel text-3xl mb-4 text-[#f5f5f5]">Thank You</h2>
              <p className="text-[#d0d0d0]">
                Whether you donate or simply use our services, we are grateful for your presence
                on this journey. Together, we are preserving ancient wisdom for the digital age.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-10 px-6 border-t border-white/10 bg-black/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="font-cinzel text-xl text-[#c9a227] tracking-wider">Etheria Systems</h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link to="/terms" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Terms of Service</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/privacy" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Privacy Policy</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/contest-rules" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Contest Rules</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/credits" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Credits</Link>
            </div>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent mx-auto" />
            <p className="text-[#6b6b8a] text-xs">&copy; {new Date().getFullYear()} Etheria Systems. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
