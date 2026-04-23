import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
          <h1 className="font-cinzel text-4xl md:text-5xl mb-4 text-[#f5f5f5]">Privacy Policy</h1>
          <p className="text-[#737373]">Last updated: April 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-8 bg-[#0f0f10]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">1. Introduction</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              At Etheria Systems, we take your privacy seriously. This Privacy Policy explains 
              how we collect, use, store, and protect your personal information when you use 
              our websites and services.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">2. Information We Collect</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Personal information (name, email address) when you contact us</li>
              <li>Usage data and analytics about how you interact with our services</li>
              <li>Device and browser information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">3. How We Use Your Information</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send updates and promotional materials (with your consent)</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Protect against fraud and abuse</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">4. Data Security</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">5. Third-Party Services</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We may use third-party services (such as analytics providers and email services) 
              that collect, monitor, and analyze information. These third parties have their 
              own privacy policies governing how they use such information.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">6. Your Rights</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Request portability of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">7. Cookies</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience 
              on our website. You can set your browser to refuse cookies, but this may 
              affect the functionality of our services.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">8. Changes to This Policy</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the date 
              at the top.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">9. Contact Us</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
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
