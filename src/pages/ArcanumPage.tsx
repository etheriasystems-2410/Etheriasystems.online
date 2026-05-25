import { useRef, useEffect } from 'react';
import { Scroll, Lock, Flame, Key, Sparkles, ExternalLink, Download, Mail, Bug, Gift, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';

export default function ArcanumPage() {
  const betaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, window.innerHeight);
  }, []);

  const scrollToBeta = () => {
    betaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Fixed Hero — Always visible in background */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <LazyVideo hero src="./arcanum-video.mp4" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/50 to-[#0a0a0b]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto">
            <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 text-[#f5f5f5] tracking-wider">Arcanum Liberatus</h1>
            <p className="text-lg sm:text-2xl text-[#a3a3a3] max-w-2xl mx-auto font-light italic mb-8 sm:mb-12 px-4">"Knowledge that has been hidden shall be revealed..."</p>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8 sm:mb-16" />
            <p className="text-base sm:text-lg text-[#a3a3a3] max-w-xl mx-auto leading-relaxed px-4 mb-6">Within the Arcanum lies the collected wisdom of ages—the hermetic mysteries, alchemical truths, and esoteric knowledge passed down through secret traditions.</p>
            <div className="max-w-lg mx-auto mb-8 p-5 sm:p-6 border border-[#c9a227]/30 rounded-xl bg-gradient-to-b from-[#0f0f10]/80 to-[#0a0a0b]/80 backdrop-blur-sm">
              <h3 className="font-cinzel text-lg sm:text-xl text-center mb-4 text-[#c9a227] tracking-wider">Thank you to Arcanum Liberatus's Beta Testers!</h3>
              <div className="grid grid-cols-4 gap-x-3 gap-y-2 text-center">
                {[
                  'J.L.', 'N.D.', '', '', '',
                  '', '', '', '', '',
                  '', '', '', '', '',
                  '', '', '', '', '',
                ].map((name, idx) => (
                  <p key={idx} className="text-[#d0d0d0] text-sm"><span className="text-[#c9a227] font-cinzel mr-1">{idx + 1}.</span>{name}</p>
                ))}
              </div>
            </div>
            <button onClick={scrollToBeta} className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a227]/20 border border-[#c9a227]/50 text-[#c9a227] font-cinzel text-xs tracking-wider rounded-full transition-all duration-300 hover:bg-[#c9a227] hover:text-[#0a0a0b] cursor-pointer backdrop-blur-sm">
              <Sparkles className="w-4 h-4" /> Join Beta Testing <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer so content starts below the fold */}
      <div className="h-screen" />

      {/* Scroll up hint */}
      <div className="relative z-10 flex justify-center pt-2">
        <span className="text-[#a3a3a3]/30 text-[10px] tracking-widest font-cinzel flex items-center gap-1 select-none pointer-events-none">
          <ChevronUp className="w-3 h-3" />
          SCROLL UP
          <ChevronUp className="w-3 h-3" />
        </span>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Feature Cards Section */}
        <section className="py-16 sm:py-32 px-4 sm:px-8 bg-[#0a0a0b]/80 backdrop-blur-sm w-full">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel text-3xl sm:text-4xl text-center mb-4 text-[#f5f5f5]">The Library's Secrets</h2>
            <p className="text-[#737373] text-center mb-12 sm:mb-20 max-w-xl mx-auto px-4">Explore the mysteries that await within</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                { icon: Scroll, title: "Ancient Manuscripts", desc: "Explore digitized grimoires and texts from the hermetic, alchemical, and mystical traditions—translated and illuminated by AI." },
                { icon: Lock, title: "Hidden Correspondences", desc: "Discover the secret connections between symbols, numbers, and elements that bind the universe together." },
                { icon: Key, title: "The Master's Key", desc: "Unlock meanings that have been obscured for centuries. The AI serves as your guide through the labyrinth of mystery." }
              ].map((feature, idx) => (
                <div key={idx} className="group relative p-6 sm:p-8 border border-[#262626]/70 rounded-xl bg-gradient-to-b from-[#0f0f10]/85 to-[#0a0a0b]/85 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#c9a227]/50">
                  <div className="absolute inset-0 bg-[url('/arcanum-bg.jpg')] opacity-5 bg-cover bg-center" />
                  <feature.icon className="w-12 h-12 sm:w-14 sm:h-14 text-[#c9a227] mb-4 sm:mb-6 relative z-10" />
                  <h3 className="font-cinzel text-lg sm:text-xl mb-2 sm:mb-3 text-[#f5f5f5] relative z-10">{feature.title}</h3>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed relative z-10">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Paths Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-8 w-full" style={{ backgroundImage: 'linear-gradient(rgba(10,10,11,0.55), rgba(10,10,11,0.7)), url(/arcanum-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-4xl text-center mb-10 sm:mb-16 text-[#f5f5f5]">Wisdom of the Ancients with a Modern Twist</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {[
                'Planetary Calculations',
                'AI Powered Divination Tools: Tarot, Runes, and Ogham',
                'Ancient Texts',
                'Comprehensive Glossaries',
                'AI Powered Spell Generators',
                'AI Powered Ritual Generators',
                'Horoscope and Natal Chart',
                'Interactive Customization',
                'Journal',
                'Connect with others'
              ].map((path, idx) => (
                <div key={idx} className="p-4 sm:p-6 border border-[#262626] rounded-lg bg-[#0a0a0b]/80 text-center hover:border-[#c9a227]/50 transition-all">
                  <Flame className="w-5 h-5 sm:w-8 sm:h-8 text-[#c9a227]/50 mx-auto mb-2 sm:mb-4" />
                  <span className="font-cinzel text-sm sm:text-base text-[#a3a3a3] leading-snug">{path}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open for Beta Testing */}
        <section ref={betaRef} className="py-16 sm:py-32 px-4 sm:px-8 bg-[#0a0a0b]/85 backdrop-blur-sm w-full">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-10 rounded-full border-2 border-[#c9a227]/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl mb-4 sm:mb-6 text-[#f5f5f5]">Open for Beta Testing</h2>
            <p className="text-[#a3a3a3] text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed px-4">Arcanum Liberatus is now open for beta testing. Be among the first to experience AI-powered arcane wisdom that honors the sacred traditions.</p>
            <a href="#" className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-base sm:text-lg tracking-wider rounded transition-all duration-300 hover:bg-[#f5f5f5] cursor-not-allowed opacity-70">
              <ExternalLink className="w-5 h-5" /> Testing Opening Soon
            </a>

            <div className="mt-16 text-left">
              <h3 className="font-cinzel text-xl sm:text-2xl text-center mb-8 text-[#f5f5f5]">To Beta Test:</h3>
              <div className="space-y-4">
                {[
                  { icon: Download, text: 'Follow link and download the .APK file' },
                  { icon: Mail, text: 'Contact Etheria Systems in-app once you have created a free account' },
                  { icon: Gift, text: 'We will send you a code valid for a free lifetime premium membership as well as instructions on how to use them to your email' },
                  { icon: Bug, text: 'You report bugs in-app by using our contact form' },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 sm:p-5 border border-[#262626]/70 rounded-xl bg-gradient-to-b from-[#0f0f10]/80 to-[#0a0a0b]/80 backdrop-blur-sm">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#c9a227]/20 flex items-center justify-center mt-0.5">
                      <step.icon className="w-4 h-4 text-[#c9a227]" />
                    </div>
                    <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed"><span className="text-[#c9a227] font-cinzel mr-2">{idx + 1}.</span>{step.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 border border-[#c9a227]/30 rounded-xl bg-[#c9a227]/5 backdrop-blur-sm text-center">
                <p className="text-[#f5f5f5] font-cinzel text-base sm:text-lg mb-2">First 15 testers to message Etheria Systems will be granted the access codes.</p>
                <p className="text-[#a3a3a3] text-sm italic">Good luck on your spiritual journey.</p>
                <p className="text-[#c9a227] text-xs tracking-wider mt-4 font-cinzel">- Arcanum Liberatus Developer</p>
              </div>
            </div>
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
