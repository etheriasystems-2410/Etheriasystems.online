import { MessageSquare, Heart, Flame, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeadSpeakPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Fixed Hero — Always visible in background */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <video src="./deadspeak-video.mp4" autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-[#0a0a0b]/50 to-[#0a0a0b]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto">
            <Sparkles className="w-16 h-16 sm:w-24 sm:h-24 text-[#c9a227] mx-auto mb-6 sm:mb-8" />
            <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 text-[#f5f5f5] tracking-wider">Dead Speak</h1>
            <p className="text-lg sm:text-2xl text-[#a3a3a3] max-w-2xl mx-auto font-light italic mb-8 sm:mb-12 px-4">"The voices of those who came before still echo..."</p>
            <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8 sm:mb-16" />
            <p className="text-base sm:text-lg text-[#a3a3a3] max-w-xl mx-auto leading-relaxed px-4">Across the veil that separates the living from the departed, there flows a current of wisdom and love. Create sacred space for honoring your ancestors.</p>
          </div>
        </div>
      </div>

      {/* Spacer so content starts below the fold */}
      <div className="h-screen" />

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Feature Cards Section */}
        <section className="py-16 sm:py-32 px-4 sm:px-8 bg-[#0a0a0b]/80 backdrop-blur-sm w-full">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel text-3xl sm:text-4xl text-center mb-4 text-[#f5f5f5]">The Sacred Communion</h2>
            <p className="text-[#737373] text-center mb-12 sm:mb-20 max-w-xl mx-auto px-4">Discover the gifts that await across the threshold</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
              {[
                { icon: Heart, title: "Honoring the Lineage", desc: "Connect with the wisdom of your bloodline. Those who walked before you hold insights that transcend time." },
                { icon: Flame, title: "The Sacred Flame", desc: "Experience guided ceremonies that create protected space for ancestral communication, with proper opening and closing rituals." },
                { icon: Users, title: "The Council of Ancestors", desc: "Receive messages from those who watch over you. Their guidance flows through the sacred space we help you create." }
              ].map((feature, idx) => (
                <div key={idx} className="group relative p-6 sm:p-8 border border-[#262626]/70 rounded-xl bg-gradient-to-b from-[#0f0f10]/85 to-[#0a0a0b]/85 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#c9a227]/50">
                  <div className="absolute inset-0 bg-[url('/deadspeak-bg.jpg')] opacity-5 bg-cover bg-center" />
                  <feature.icon className="w-12 h-12 sm:w-14 sm:h-14 text-[#c9a227] mb-4 sm:mb-6 relative z-10" />
                  <h3 className="font-cinzel text-lg sm:text-xl mb-2 sm:mb-3 text-[#f5f5f5] relative z-10">{feature.title}</h3>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed relative z-10">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 sm:py-32 px-4 sm:px-8 w-full" style={{ backgroundImage: 'linear-gradient(rgba(10,10,11,0.5), rgba(10,10,11,0.65)), url(/deadspeak-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-[#c9a227]/70 mx-auto mb-6 sm:mb-10" />
            <blockquote className="font-cinzel text-xl sm:text-3xl text-[#f5f5f5]/90 italic leading-relaxed px-4">"Death is but a door, and those who have passed through it still have much to teach the living."</blockquote>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="py-16 sm:py-32 px-4 sm:px-8 bg-[#0a0a0b]/85 backdrop-blur-sm w-full">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-10 rounded-full border-2 border-[#c9a227]/30 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a227]" />
            </div>
            <h2 className="font-cinzel text-2xl sm:text-4xl mb-4 sm:mb-6 text-[#f5f5f5]">The Veil Grows Thin</h2>
            <p className="text-[#a3a3a3] text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed px-4">Dead Speak is preparing to open the channels of ancestral communication. The time for honoring those who came before draws near.</p>
            <button className="px-8 sm:px-12 py-4 sm:py-5 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-base sm:text-lg tracking-wider rounded transition-all duration-300 hover:bg-[#f5f5f5]">Coming Soon</button>
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
