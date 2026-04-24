import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Image, Clapperboard, Mic, Code, HardDrive, Globe, AtSign, Mail, Terminal, Star, BookOpen, Atom } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

const spiritualTexts = [
  'Keys of Solomon - attributed to King Solomon',
  'Three Books of Occult Philosophy (De Occulta Philosophia libri III) - Heinrich Cornelius Agrippa',
  'The Book of the Sacred Magic of Abramelin the Mage - Samuel Liddell MacGregor Mathers',
  'Encyclopedia of Spirits - Judika Illes',
  'The New Encyclopedia of the Occult - John Michael Greer',
  'An Evaluation of the Remote Viewing Program - CIA.gov',
  'Star Gate Project: An Overview - CIA.gov',
  'The Picatrix - Unknown',
  'The Grimorium Verum - Unknown',
  'Corpus Hermeticum - Unknown',
  'Egyptian Books of the Dead - Unknown',
  'Malleus Maleficarum - Unknown',
];

const betaTesters = [
  'J.L.',
  'N.D.',
];

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-md bg-black/45 border border-white/10 rounded-2xl ${className}`}>
    {children}
  </div>
);

export default function CreditsPage() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const scrollToLeft = () => {
    leftRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToMobile = () => {
    rightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      gsap.fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
      [leftRef, rightRef].forEach((ref) => {
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
      <LazyVideo hero src="./credits-hero-video.mp4" className="fixed inset-0 w-full h-full object-cover z-0" style={{ filter: 'brightness(0.5)' }} />
      <div className="fixed inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55 z-[1] pointer-events-none" />

      <div className="relative z-10">
        <section className="min-h-[50vh] flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 ref={heroTitleRef} className="font-cinzel text-5xl md:text-6xl mb-4 text-[#f5f5f5] drop-shadow-lg">Credits</h1>
            <p ref={heroSubRef} className="text-xl text-[#a0a0b8] max-w-3xl mx-auto leading-relaxed px-4">
              Creators, think-tank, spiritual advisors, and technical companies which lent their services to help Etheria Systems, and its applications, come to life on the web and on your devices.
            </p>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-8" />
          </div>
        </section>

        <section className="py-8 px-6 pb-24">
          {/* Floating jump-to buttons (mobile only) */}
          <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center gap-2 px-4">
            <button onClick={scrollToLeft} className="flex-1 max-w-[140px] px-2 py-1.5 border border-[#c9a227]/60 text-[#c9a227] font-cinzel text-[10px] tracking-wider rounded-full bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.2)] active:bg-[#c9a227]/20 active:scale-95 transition-all">
              Jump to etheriasystems.online
            </button>
            <button onClick={scrollToMobile} className="flex-1 max-w-[140px] px-2 py-1.5 border border-[#c9a227]/60 text-[#c9a227] font-cinzel text-[10px] tracking-wider rounded-full bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(201,162,39,0.2)] active:bg-[#c9a227]/20 active:scale-95 transition-all">
              Jump to Mobile Applications
            </button>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-0">

            {/* LEFT: etheriasystems.online */}
            <div className="flex-1 md:pr-8" ref={leftRef}>
              <h2 className="font-cinzel text-xl sm:text-2xl text-[#c9a227] text-center tracking-wider mb-6 border-b border-[#c9a227]/20 pb-3 md:border-b-0 md:pb-0">etheriasystems.online</h2>
              <div className="flex flex-col gap-4">

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Music className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Background Music</h3>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[#d0d0d0] text-sm"><span className="font-cinzel text-[#c9a227]">&quot;The Long Dark&quot;</span> by <span className="text-[#f5f5f5]">Scott Buckley</span></p>
                    <p className="text-[#a0a0b8] text-xs"><a href="https://soundcloud.com/scottbuckley" target="_blank" rel="noopener noreferrer" className="text-[#00e5e5] hover:underline transition-colors">soundcloud.com/scottbuckley</a></p>
                    <p className="text-[#a0a0b8] text-xs">Royalty Free Music by <a href="https://www.free-stock-music.com" target="_blank" rel="noopener noreferrer" className="text-[#00e5e5] hover:underline transition-colors">free-stock-music.com</a></p>
                    <p className="text-[#a0a0b8] text-xs">Creative Commons / Attribution 4.0 International (CC BY 4.0)</p>
                    <p className="text-[#a0a0b8] text-xs"><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#00e5e5] hover:underline transition-colors">creativecommons.org/licenses/by/4.0</a></p>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Star className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Spiritual Advisors</h3>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[#d0d0d0] text-sm">J.L.</p>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <BookOpen className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Spiritual Texts</h3>
                  </div>
                  <div className="text-center space-y-2">
                    {spiritualTexts.map((text) => (
                      <p key={text} className="text-[#d0d0d0] text-sm">{text}</p>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Atom className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Astrological Calculations</h3>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[#d0d0d0] text-sm">Swiss Ephemeris</p>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Image className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Pictures</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a href="https://www.shutterstock.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Shutterstock</a>
                    <a href="https://craynola.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Craynola.com</a>
                    <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">ChatGBT</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Clapperboard className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Video Animations</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://photos.google.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Google Photos</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <HardDrive className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Storage</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">GitHub</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Globe className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Web Hosting</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Netlify</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <AtSign className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Domain Name</h3>
                  </div>
                  <div className="text-center">
                    <span className="text-[#6b6b8a] text-sm italic">Coming soon</span>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Mail className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Email</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Gmail</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Terminal className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Coding Applications</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a href="https://kimi.ai" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Kimi</a>
                    <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">ChatGBT</a>
                  </div>
                </GlassCard>

              </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden md:flex flex-col items-center mx-0">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#c9a227]/40 to-transparent" />
            </div>
            <div className="md:hidden my-6 flex justify-center">
              <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent" />
            </div>

            {/* RIGHT: Mobile Applications */}
            <div className="flex-1 md:pl-8" ref={rightRef}>
              <h2 className="font-cinzel text-xl sm:text-2xl text-[#c9a227] text-center tracking-wider mb-6 border-b border-[#c9a227]/20 pb-3 md:border-b-0 md:pb-0">Mobile Applications</h2>
              <div className="flex flex-col gap-4">

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Star className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Thank You to Etheria&apos;s Beta Testers!</h3>
                  </div>
                  <div className="text-center space-y-2">
                    {betaTesters.map((name, idx) => (
                      <p key={name} className="text-[#d0d0d0] text-sm"><span className="text-[#c9a227] font-cinzel mr-2">{idx + 1}.</span>{name}</p>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Code className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Coding Systems</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a href="https://emergent.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Emergent</a>
                    <a href="https://base44.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Base44</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Image className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Pictures</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a href="https://www.shutterstock.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Shutterstock</a>
                    <a href="https://craynola.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Craynola.com</a>
                    <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">ChatGBT</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Clapperboard className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Video Animations</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://photos.google.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Google Photos</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Mic className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">TTS</h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a href="https://elevenlabs.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">ElevenLabs</a>
                    <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Google Gemini</a>
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <BookOpen className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Spiritual Texts</h3>
                  </div>
                  <div className="text-center space-y-2">
                    {spiritualTexts.map((text) => (
                      <p key={text} className="text-[#d0d0d0] text-sm">{text}</p>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3 justify-center">
                    <Mail className="w-5 h-5 text-[#c9a227]" />
                    <h3 className="font-cinzel text-base sm:text-lg text-[#f5f5f5]">Email</h3>
                  </div>
                  <div className="text-center">
                    <a href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#d0d0d0] text-sm hover:text-[#00e5e5] transition-colors">Gmail</a>
                  </div>
                </GlassCard>

              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 border-t border-white/10 bg-black/60 backdrop-blur-md mt-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="font-cinzel text-xl text-[#c9a227] tracking-wider">Etheria Systems</h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/terms" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Terms of Service</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/privacy" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Privacy Policy</Link>
              <span className="text-[#6b6b8a]">|</span>
              <Link to="/contest-rules" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Contest Rules</Link>
            </div>
            <p className="text-[#6b6b8a] text-xs">
              &copy; {new Date().getFullYear()} Etheria Systems. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
