import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyVideo from '../components/LazyVideo';

/**
 * App-specific privacy policy for the Etheria mobile app
 * (Android & iOS, package com.etheriasystems.etheria).
 *
 * This page is the hosted privacy-policy URL used for the Google Play
 * store listing — it covers the app's data practices specifically,
 * separate from the website policy at /privacy.
 */
export default function AppPrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* ═════ FULL-PAGE VIDEO HERO ═════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <LazyVideo hero src="./privacy-hero-video.mp4" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0a0b]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0b]/30 via-transparent to-[#0a0a0b]/80" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-8">
          <Shield className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
          <h1 className="font-cinzel text-4xl md:text-5xl mb-4 text-[#f5f5f5] drop-shadow-lg">Etheria App — Privacy Policy</h1>
          <p className="text-[#a3a3a3]">Last updated: September 19, 2026</p>
        </div>
      </section>

      {/* ═════ CONTENT — SEMI-TRANSPARENT WRAPPER ═════ */}
      <section className="relative py-12 px-8">
        {/* Subtle video bleed-through: low-opacity dark overlay instead of solid bg */}
        <div className="absolute inset-0 bg-[#0a0a0b]/70" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">1. Introduction</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              This Privacy Policy explains how Etheria Systems (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;)
              collects, uses, stores, and protects your personal information when you use the
              <span className="text-[#f5f5f5]"> Etheria </span>
              mobile application for Android and iOS (the &quot;App&quot;), a self-help, meditation, and
              self-enlightenment companion. It applies to the App only. Our website privacy
              practices are described separately at{' '}
              <Link to="/privacy" className="text-[#c9a227] hover:underline">etheriasystems.online/privacy</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">2. Information We Collect</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              We collect only the information needed to run the App and deliver its features:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Account information: your name, email address, and profile picture</li>
              <li>Journal entries and reflections you write in the App</li>
              <li>Voice memos (audio recordings) you create in the App</li>
              <li>Photos you upload, including your profile picture</li>
              <li>App preferences: theme, language, and notification settings</li>
              <li>Subscription and purchase status (for example, whether Etheria Premium is active)</li>
              <li>Device and diagnostic data: device model, operating system version, app version, and crash logs</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">3. Device Permissions We Request</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              The App may request the following permissions on your device. You can change
              or revoke these at any time in your device settings; some features may be
              limited if a permission is denied.
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li><span className="text-[#f5f5f5]">Camera</span> — used for meditation light-therapy sessions and for taking profile pictures</li>
              <li><span className="text-[#f5f5f5]">Microphone</span> — used to record voice memos</li>
              <li><span className="text-[#f5f5f5]">Notifications</span> — used to send meditation reminders and session updates</li>
              <li><span className="text-[#f5f5f5]">Media playback / foreground service</span> — used to keep guided meditations and audio playing while the App runs in the background</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">4. How We Use Your Information</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>Create and maintain your account</li>
              <li>Save and sync your journal entries, voice memos, and preferences</li>
              <li>Provide meditation content, reminders, and personalized features</li>
              <li>Process subscriptions and manage your access to premium features</li>
              <li>Respond to your support requests</li>
              <li>Diagnose crashes and improve the App&apos;s reliability</li>
            </ul>
            <p className="text-[#a3a3a3] leading-relaxed mt-4">
              We do not sell your personal information, and we never use your journal
              entries, voice memos, or photos for advertising.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">5. Subscriptions &amp; Payments</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              Paid features such as Etheria Premium are billed through your app store
              (Google Play Billing on Android, the App Store on iOS) or, for web purchases,
              through our payment processor Stripe. Payment details are handled directly by
              the store or processor — we never see or store your full credit card number.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">6. Third-Party Services</h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-4">
              The App relies on the following third-party services, each of which processes
              data under its own privacy policy:
            </p>
            <ul className="list-disc list-inside text-[#a3a3a3] space-y-2 ml-4">
              <li>MongoDB — secure cloud database hosting our backend</li>
              <li>OpenAI, Google GenAI, and ElevenLabs — AI-generated meditation content and voice features</li>
              <li>Stripe — web subscription payments</li>
              <li>Google Play Billing / Apple App Store — in-app purchases</li>
            </ul>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">7. Data Security</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">8. Data Retention &amp; Deletion</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We keep your information for as long as your account is active. You may
              request a copy of your data or ask us to delete your account and all
              associated data at any time by emailing{' '}
              <a href="mailto:etheriasystems@gmail.com" className="text-[#c9a227] hover:underline">
                etheriasystems@gmail.com
              </a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">9. Children&apos;s Privacy</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              The App is not directed at children under 13, and we do not knowingly collect
              personal information from children under 13. If we learn that we have collected
              such information, we will delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">10. Your Rights</h2>
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
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">11. Changes to This Policy</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              We may update this Privacy Policy from time to time. We will post the new
              policy on this page and update the date at the top. Continued use of the App
              after changes take effect means you accept the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-cinzel text-2xl mb-4 text-[#f5f5f5]">12. Contact Us</h2>
            <p className="text-[#a3a3a3] leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices,
              please contact us at:{' '}
              <a href="mailto:etheriasystems@gmail.com" className="text-[#c9a227] hover:underline">
                etheriasystems@gmail.com
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
                <Link to="/app-privacy" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Etheria App Privacy</Link>
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
