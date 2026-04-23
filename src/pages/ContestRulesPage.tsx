import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';
  Trophy, Mail, CheckCircle, AlertTriangle, Sparkles, Gift,
  Calendar, Shuffle, Ticket, RotateCcw
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── Glass Card wrapper ─────────────────────────────────────────── */
const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/45 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function ContestRulesPage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const s1Ref = useRef<HTMLElement>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const s3Ref = useRef<HTMLElement>(null);
  const s4Ref = useRef<HTMLElement>(null);
  const s5Ref = useRef<HTMLElement>(null);
  const s6Ref = useRef<HTMLElement>(null);
  const s7Ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });

      /* Sections staggered fade-up */
      [s1Ref, s2Ref, s3Ref, s4Ref, s5Ref, s6Ref, s7Ref].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(ref.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* ═════ FIXED FULL-PAGE VIDEO BACKGROUND ═════ */}
      <LazyVideo
        hero
        src="./contest-hero-video.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.55)' }}
      />

      {/* Dark gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/55 z-0 pointer-events-none" />

      {/* ═════ SCROLLABLE CONTENT ═════ */}
      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-[75vh] flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-[#c9a227] mx-auto mb-6 sm:mb-8 drop-shadow-[0_0_20px_rgba(201,162,39,0.4)]" />
            <h1
              ref={heroTitleRef}
              className="font-cinzel text-4xl sm:text-6xl mb-4 sm:mb-6 text-[#f5f5f5] tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Contest Rules
            </h1>
            <p
              ref={heroSubRef}
              className="text-lg sm:text-xl text-[#e0e0e0] max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
            >
              Bi-Weekly Premium Membership Drawing
            </p>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-8 sm:mt-12" />
          </div>
        </section>

        {/* ── Every App Has a Contest ── */}
        <section className="py-10 px-6" ref={s1Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-6 justify-center">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Every App Has a Contest</h2>
              </div>
              <p className="text-[#d0d0d0] text-lg leading-relaxed text-center max-w-3xl mx-auto">
                Each Etheria Systems application runs its own independent bi-weekly contest drawing.
                There are no limits to how many different app contests you can enter, but each
                application requires separate eligibility and opt-in.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ── What You Win ── */}
        <section className="py-10 px-6" ref={s2Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">What You Can Win</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="p-6 sm:p-8 border border-[#c9a227]/30 rounded-xl bg-[rgba(201,162,39,0.05)]">
                  <h3 className="font-cinzel text-xl sm:text-2xl mb-4 text-[#c9a227]">One Month Premium</h3>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    The standard prize is <span className="text-[#f5f5f5] font-semibold">one free month of Premium membership</span>,
                    valid only for the specific app you submitted your opt-in entry for.
                    This unlocks all premium features for 30 days from activation.
                  </p>
                </div>

                <div className="p-6 sm:p-8 border border-[#c9a227]/50 rounded-xl bg-gradient-to-b from-[rgba(201,162,39,0.1)] to-[rgba(201,162,39,0.02)]">
                  <h3 className="font-cinzel text-xl sm:text-2xl mb-4 text-[#c9a227] flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Lifetime Premium
                  </h3>
                  <p className="text-[#d0d0d0] leading-relaxed">
                    On rare occasions, a contest may award a <span className="text-[#f5f5f5] font-semibold">Lifetime Premium Membership</span>
                    instead of a one-month prize. The application will clearly state if the current
                    contest is for a 1-month or lifetime membership. All other rules and procedures
                    remain the same.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 border border-[#c9a227]/20 rounded-lg bg-[rgba(201,162,39,0.03)]">
                <p className="text-[#b0b0b0] text-sm text-center italic">
                  The application will always clearly disclose whether the current drawing
                  is for a 1-month or lifetime premium membership before you opt in.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Winner Notification ── */}
        <section className="py-10 px-6" ref={s3Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Winner Notification</h2>
              </div>

              <div className="space-y-6">
                {[
                  { num: '1', title: 'Drawing Day', text: 'On the day of the drawing, one random eligible user will be selected from all qualified entries for that specific app.' },
                  { num: '2', title: 'Email Notification', text: 'The winner will be notified by email at the address associated with their account. The email will contain all details about the prize won.' },
                  { num: '3', title: 'Your Redemption Code', text: 'The email will include a one-time use code good for your free premium membership, along with clear instructions on how to redeem it. Codes are single-use and expire if not claimed within 14 days.' },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4 sm:gap-6 items-start">
                    <span className="flex-shrink-0 w-10 h-10 bg-[#c9a227] text-[#0a0a0b] rounded-full flex items-center justify-center font-cinzel font-bold">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-cinzel text-lg sm:text-xl mb-2 text-[#f5f5f5]">{item.title}</h3>
                      <p className="text-[#d0d0d0] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Eligibility ── */}
        <section className="py-10 px-6" ref={s4Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Eligibility Requirements</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'Active Usage', text: 'Each application has its own usage threshold requirements that must be met before a user is deemed eligible to win.' },
                  { icon: <Shuffle className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'Opt-In Required', text: 'You must actively opt-in to each app\'s contest. Simply using the app does not automatically enter you into the drawing.' },
                  { icon: <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mx-auto mb-4 sm:mb-6" />, title: 'App-Specific', text: 'Entries are application-specific. Entering one app\'s contest does not enter you into any other app\'s contest.' },
                ].map((card, i) => (
                  <div key={i} className="p-6 sm:p-8 border border-white/10 rounded-xl bg-black/30 text-center">
                    {card.icon}
                    <h3 className="font-cinzel text-lg sm:text-xl mb-3 text-[#f5f5f5]">{card.title}</h3>
                    <p className="text-[#d0d0d0] text-sm leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 p-4 sm:p-6 border border-[#c9a227]/20 rounded-lg bg-[rgba(201,162,39,0.03)]">
                <p className="text-[#d0d0d0] text-center">
                  Each application will disclose its specific usage threshold requirements
                  and when the contest drawing will be held within the app itself.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Entry Limits ── */}
        <section className="py-10 px-6" ref={s5Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <Ticket className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Entry Limits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="p-6 sm:p-8 border border-white/10 rounded-xl bg-black/30 text-center">
                  <h3 className="font-cinzel text-lg sm:text-xl mb-3 text-[#c9a227]">One Entry Per App</h3>
                  <p className="text-[#d0d0d0] text-sm leading-relaxed">
                    You may only have one active entry per app at any given time. Submitting multiple entries for the same app will not increase your chances of winning.
                  </p>
                </div>

                <div className="p-6 sm:p-8 border border-white/10 rounded-xl bg-black/30 text-center">
                  <h3 className="font-cinzel text-lg sm:text-xl mb-3 text-[#c9a227]">Multiple Apps Allowed</h3>
                  <p className="text-[#d0d0d0] text-sm leading-relaxed">
                    You are welcome to enter contests across multiple different apps simultaneously. Each app's contest is independent with its own drawing and eligibility requirements.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 border border-[#c9a227]/20 rounded-lg bg-[rgba(201,162,39,0.03)]">
                <p className="text-[#b0b0b0] text-sm text-center italic">
                  Enter as many different app contests as you like, but remember only one entry per app counts toward any single drawing.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Entry Reset ── */}
        <section className="py-10 px-6" ref={s6Ref}>
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-8 justify-center">
                <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Entry Reset</h2>
              </div>

              <div className="space-y-6 max-w-3xl mx-auto">
                {[
                  { icon: <RotateCcw className="flex-shrink-0 w-10 h-10 text-[#c9a227] mt-1" />, title: 'Automatic Reset', text: <>All contest entries are automatically erased at <span className="text-[#f5f5f5] font-semibold">midnight on the day of the drawing</span>. This reset happens system-wide for all apps simultaneously.</> },
                  { icon: <Calendar className="flex-shrink-0 w-10 h-10 text-[#c9a227] mt-1" />, title: 'Re-Enter the Next Day', text: <>Once entries have been cleared, you may submit a new entry for the next drawing cycle starting the very next day. Each bi-weekly period is a fresh opportunity to win.</> },
                  { icon: <Sparkles className="flex-shrink-0 w-10 h-10 text-[#c9a227] mt-1" />, title: 'No Carryover', text: <>Entries do not carry over from one drawing period to the next. If you entered a previous drawing and did not win, you must submit a fresh entry for the next cycle.</> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-6 items-start">
                    {item.icon}
                    <div>
                      <h3 className="font-cinzel text-lg sm:text-xl mb-2 text-[#f5f5f5]">{item.title}</h3>
                      <p className="text-[#d0d0d0] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 p-4 sm:p-6 border border-[#c9a227]/20 rounded-lg bg-[rgba(201,162,39,0.03)]">
                <p className="text-[#d0d0d0] text-center">
                  The entry reset ensures every drawing starts with a clean slate, giving all participants an equal and fair chance to win each time.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Important Notice ── */}
        <section className="py-10 px-6" ref={s7Ref}>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 sm:p-10 border-[#c9a227]/30">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
                <h2 className="font-cinzel text-xl sm:text-2xl text-[#f5f5f5]">Important Notice</h2>
              </div>

              <div className="space-y-6 text-[#d0d0d0] leading-relaxed">
                <p className="text-lg sm:text-xl text-[#f5f5f5] font-cinzel text-center">
                  All winnings and decisions are final and selected entirely at random by Quantum AI mechanics.
                </p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a227]/50 to-transparent" />

                <p className="text-center">
                  Winnings may not be sold and are non-transferable.
                  Premium membership codes are tied to the winning account and cannot be
                  exchanged, resold, or gifted to another user.
                </p>

                <p className="text-center text-[#b0b0b0] text-sm">
                  Etheria Systems reserves the right to modify, suspend, or terminate any
                  contest at any time with notice provided within the affected application.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ── Questions ── */}
        <section className="py-16 px-6 pb-24">
          <div className="max-w-2xl mx-auto text-center">
            <GlassCard className="p-10">
              <h2 className="font-cinzel text-2xl sm:text-3xl mb-4 text-[#f5f5f5]">Questions?</h2>
              <p className="text-[#d0d0d0] mb-8 leading-relaxed px-4">
                For contest-related inquiries, please contact us through the app or visit our Contact page.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 sm:px-10 py-4 bg-gradient-to-r from-[#c9a227] to-[#e5c100] text-[#0a0a0b] font-cinzel tracking-wider rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.4)]"
              >
                Contact Us
              </a>
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
