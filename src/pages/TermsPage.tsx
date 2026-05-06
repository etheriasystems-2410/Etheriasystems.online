import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <Scale className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
          <h1 className="font-cinzel text-4xl md:text-5xl mb-4 text-[#f5f5f5]">Terms of Service</h1>
          <p className="text-[#737373]">Last updated: April 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-8 bg-[#0f0f10]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">1. Acceptance of Terms</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              By accessing and using Etheria Systems websites, products, and services, you agree 
              to be bound by these Terms of Service. If you do not agree to these terms, please 
              do not use our services.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">2. Description of Services</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              Etheria Systems provides AI-powered spiritual and mystical tools and platforms. 
              Our services are for entertainment, educational, and personal growth purposes only. 
              We do not provide medical, legal, financial, or professional advice.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">3. User Responsibilities</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Use our services only for lawful purposes</li>
              <li>Not attempt to disrupt or interfere with our services</li>
              <li>Not use our services to harm others or yourself</li>
              <li>Maintain the confidentiality of your account information</li>
              <li>Accept full responsibility for decisions made based on our services</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">4. Disclaimer</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              Our AI-powered spiritual services are experimental and for entertainment purposes. 
              We make no guarantees about the accuracy, completeness, or usefulness of any 
              information provided. Always use your own judgment and consult appropriate 
              professionals for important life decisions.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">5. Intellectual Property</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              All content, trademarks, logos, and intellectual property on our platforms are 
              owned by Etheria Systems or our licensors. You may not reproduce, distribute, 
              or create derivative works without our express permission.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">6. Limitation of Liability</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              Etheria Systems shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from your use of our services. 
              Our total liability shall not exceed the amount you have paid us in the 
              past twelve months.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">7. Changes to Terms</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users 
              of significant changes. Continued use of our services after changes constitutes 
              acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">8. Contact</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:contact@etheriasystems.online" className="text-[#c9a227] hover:underline">
                contact@etheriasystems.online
              </a>
            </p>
          </div>

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
