import { Sparkles, Gift, Crown, Star, Check, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <Crown className="w-16 h-16 sm:w-24 sm:h-24 text-[#c9a227] mx-auto mb-6 sm:mb-8" />
          <h1 className="font-cinzel text-5xl sm:text-7xl mb-4 sm:mb-6 text-[#f5f5f5] tracking-wider">
            Premium Access
          </h1>
          <p className="text-lg sm:text-2xl text-[#a3a3a3] max-w-2xl mx-auto font-light italic px-4">
            "The path of wisdom is open to all, but deeper mysteries await those who seek..."
          </p>
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-8 sm:mt-12" />
        </div>
      </section>

      {/* Free vs Premium */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0f0f10]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl text-center mb-4 text-[#f5f5f5]">Choose Your Path</h2>
          <p className="text-[#737373] text-center mb-12 sm:mb-16 max-w-xl mx-auto px-4">
            Every Etheria Systems app offers free access to core features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Free Tier */}
            <div className="relative p-8 sm:p-10 border border-[#262626] rounded-2xl bg-gradient-to-b from-[#0f0f10] to-[#0a0a0b]">
              <div className="flex items-center gap-4 mb-6">
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-[#a3a3a3]" />
                <div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Free Access</h3>
                  <p className="text-[#737373] text-sm">Available to all seekers</p>
                </div>
              </div>
              
              <div className="text-4xl sm:text-5xl font-cinzel text-[#f5f5f5] mb-8">
                $0<span className="text-lg text-[#737373]">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Core app functionality',
                  'Basic readings and guidance',
                  'Limited daily interactions',
                  'Advanced AI features',
                  'Ad-free experience',
                  'Standard support'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#a3a3a3]">
                    <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 bg-[rgba(201,162,39,0.05)] border border-[rgba(201,162,39,0.2)] rounded-lg">
                <p className="text-[#a3a3a3] text-sm italic">
                  "The free path offers genuine value. We believe wisdom should never be locked behind a paywall."
                </p>
              </div>
            </div>

            {/* Premium Tier */}
            <div className="relative p-8 sm:p-10 border-2 border-[#c9a227]/50 rounded-2xl bg-gradient-to-b from-[#0f0f10] to-[#0a0a0b] shadow-[0_0_40px_rgba(201,162,39,0.1)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-sm rounded-full">
                Recommended
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227]" />
                <div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5]">Premium</h3>
                  <p className="text-[#737373] text-sm">Unlock the full experience</p>
                </div>
              </div>
              
              <div className="text-4xl sm:text-5xl font-cinzel text-[#c9a227] mb-2">
                $3.99<span className="text-lg text-[#737373]">/month</span>
              </div>
              <p className="text-[#737373] text-sm mb-8">Maximum price for any Etheria app</p>
              
              <ul className="space-y-4">
                {[
                  'Everything in Free, plus:',
                  'Community access',
                  'Unlimited readings and guidance',
                  'Priority support',
                  'Exclusive content and updates',
                  'Early access to new features',
                  'Ad-free experience'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#a3a3a3]">
                    <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-3xl sm:text-4xl mb-6 text-[#f5f5f5]">Our Sacred Promise</h2>
          <div className="p-6 sm:p-8 border border-[#c9a227]/30 rounded-2xl bg-[rgba(201,162,39,0.05)]">
            <p className="text-xl sm:text-2xl text-[#c9a227] font-cinzel mb-4">
              We Will Never Charge More Than $3.99/Month
            </p>
            <p className="text-[#a3a3a3] leading-relaxed">
              For any app we create, ever. This is our commitment to keeping spiritual wisdom 
              accessible. No hidden fees, no surprise price increases, no premium tiers beyond 
              this single fair price.
            </p>
          </div>
        </div>
      </section>

      {/* Bi-Weekly Contest */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0f0f10]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-[#c9a227] mx-auto mb-6 sm:mb-8" />
            <h2 className="font-cinzel text-3xl sm:text-4xl mb-4 text-[#f5f5f5]">The Bi-Weekly Drawing</h2>
            <p className="text-[#a3a3a3] max-w-xl mx-auto px-4">
              Fortune favors the active seeker
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 border border-[#262626] rounded-xl bg-[#0a0a0b]">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mb-6" />
              <h3 className="font-cinzel text-xl sm:text-2xl mb-4 text-[#f5f5f5]">What You Can Win</h3>
              <p className="text-[#a3a3a3] leading-relaxed mb-4">
                One lucky member from each app will receive <span className="text-[#c9a227]">1 full month of Premium access</span> to the app they entered for—completely free.
              </p>
              <p className="text-[#737373] text-sm">
                Both free and paid members are eligible to win.
              </p>
            </div>
            
            <div className="p-6 sm:p-8 border border-[#262626] rounded-xl bg-[#0a0a0b]">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mb-6" />
              <h3 className="font-cinzel text-xl sm:text-2xl mb-4 text-[#f5f5f5]">How to Qualify</h3>
              <ul className="space-y-3 text-[#a3a3a3]">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <span>Use the app regularly</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <span>Meet the usage threshold for that app</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                  <span>Submit your entry before the drawing</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12 p-6 sm:p-8 border border-[#c9a227]/20 rounded-xl bg-[rgba(201,162,39,0.03)]">
            <h4 className="font-cinzel text-lg sm:text-xl mb-4 text-[#f5f5f5] flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#c9a227]" />
              Important Notes
            </h4>
            <ul className="space-y-3 text-[#a3a3a3]">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227]">•</span>
                <span>Each app's drawing is separate—entries do not carry over between apps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227]">•</span>
                <span>Usage thresholds vary by app and will be announced with each drawing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227]">•</span>
                <span>Winners are selected randomly from all qualified entries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227]">•</span>
                <span>Premium access begins immediately upon winning notification</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0a0a0b]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl sm:text-3xl mb-6 text-[#f5f5f5]">Begin Your Journey</h2>
          <p className="text-[#a3a3a3] mb-8 leading-relaxed px-4">
            All Etheria Systems apps will be available soon. Whether you choose the free path 
            or unlock premium features, the wisdom of the ages awaits.
          </p>
          <button className="px-10 sm:px-12 py-4 sm:py-5 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-base sm:text-lg tracking-wider rounded transition-all duration-300 hover:bg-[#f5f5f5]">
            Coming Soon
          </button>

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
      </section>
    </div>
  );
}
