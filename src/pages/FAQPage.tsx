import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Crown, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is Etheria Systems?',
    answer: 'Etheria Systems is a collection of AI-powered spiritual and mystical tools designed to bridge ancient wisdom with modern technology. Our applications cover meditation, tarot, ancestral communication, and arcane knowledge—each powered by Quantum AI to deliver personalized, meaningful experiences.',
    category: 'General'
  },
  {
    question: 'Are your apps available on iOS?',
    answer: 'Currently, our applications are available on Android devices via .APK download. iOS support is planned for future releases. Stay tuned to our newsletter and social channels for updates.',
    category: 'General'
  },
  {
    question: 'How do I download an app?',
    answer: 'Visit the product page for the app you want and click the "Get .APK" button. This will download the Android installation file. You may need to enable "Install from unknown sources" in your Android device settings. Each product page has step-by-step instructions.',
    category: 'General'
  },
  {
    question: 'How much does a subscription cost?',
    answer: 'All Etheria Systems applications are priced at $3.99 per month. We will never charge more than this for any app we create. This is our sacred promise to keeping spiritual wisdom accessible.',
    category: 'Subscriptions & Pricing'
  },
  {
    question: 'Is there a free tier?',
    answer: 'Most of our applications offer a free tier with core tools available to all seekers. However, Arcanum. Tarot Academy requires an active subscription to function—there is no free tier for this application. Arcanum Liberatus offers a free tier with core tools, while premium subscribers unlock advanced features.',
    category: 'Subscriptions & Pricing'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards through our secure in-app payment system. Payments are processed via industry-standard encryption.',
    category: 'Subscriptions & Pricing'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time through your account settings. Your premium access will continue until the end of your current billing period. There are no cancellation fees or hidden charges.',
    category: 'Subscriptions & Pricing'
  },
  {
    question: 'How does the Bi-Weekly Contest work?',
    answer: 'Every two weeks, we hold a random drawing for each app. Users who meet the activity threshold are automatically entered. One winner per app receives a free month of premium access. Both free and paid members are eligible to win. Winners are contacted via email with their redemption code.',
    category: 'Subscriptions & Pricing'
  },
  {
    question: 'How do I become a beta tester?',
    answer: 'When beta testing is open for an app, visit its product page and click the "Get .APK" button to download the beta version. Create a free account in-app, then contact us through the in-app contact form. The first 20 testers to message us will receive a free lifetime premium membership code.',
    category: 'Beta Testing'
  },
  {
    question: 'What do I get for beta testing?',
    answer: 'Beta testers who report bugs and provide feedback receive a code valid for a free lifetime premium membership to the app they tested. This includes all future premium features and updates.',
    category: 'Beta Testing'
  },
  {
    question: 'Is beta testing available for all apps?',
    answer: 'Beta testing opens on a per-app basis. Currently, Etheria and Arcanum Liberatus are open for beta testing. Dead Speak and Arcanum. Tarot Academy will open for beta testing soon. Check each product page for current status.',
    category: 'Beta Testing'
  },
  {
    question: 'What is Etheria?',
    answer: 'Etheria is a Quantum AI-powered meditation and psychic awareness study tool. It includes guided meditation techniques, Chakra Alignment Meditations, timed meditation with ambient sounds, and practical hands-on classes designed to evolve your psychic gifts.',
    category: 'Products'
  },
  {
    question: 'What is Arcanum Liberatus?',
    answer: 'Arcanum Liberatus is a mobile grimoire powered by Quantum AI. It blends ancient knowledge with modern technology, offering glossaries of crystals and herbs, over 250 gods/goddesses/spirits, horoscopes, natal charts, planetary calculators, AI-powered ritual and spell generators, and a personal journal. Free tier includes core tools; premium unlocks AI chat, the Ritual & Spell Creator, Sigil Garden, and more.',
    category: 'Products'
  },
  {
    question: 'What is Arcanum. Tarot Academy?',
    answer: 'Arcanum. Tarot Academy is your complete guide to tarot mastery. Learn all 78 cards inside and out, from the Major Arcana to the Minor Mysteries. Features include guided pathworking, expert spreads from three-card pulls to the Celtic Cross, and deep knowledge of symbolism, numerology, and elemental correspondences. A subscription is required to use this app.',
    category: 'Products'
  },
  {
    question: 'What is Dead Speak?',
    answer: 'Dead Speak is a comprehensive tool and spiritualism study guide for communicating with those who have departed. It covers spiritualist beliefs and offers hands-on training in the art of sacred ancestral communication, including guided ceremonies and protected space creation.',
    category: 'Products'
  },
  {
    question: 'The app is not installing. What should I do?',
    answer: 'First, ensure you have enabled "Install from unknown sources" in your Android device settings under Security. If the issue persists, try downloading the .APK again in case the file was corrupted. For further assistance, contact us through the website contact form.',
    category: 'Technical Support'
  },
  {
    question: 'How do I report a bug?',
    answer: 'The best way to report a bug is through the in-app contact form. This automatically includes your device information and app version. Alternatively, you can email us at contact@etheriasystems.online with details about the issue.',
    category: 'Technical Support'
  },
  {
    question: 'Will my data be saved if I switch devices?',
    answer: 'Yes, all your data—including journal entries, saved readings, and account information—is synced to your account and can be accessed on any device when you log in.',
    category: 'Technical Support'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely. We take data security seriously and implement appropriate technical and organizational measures to protect your personal information. We never sell your data to third parties. For full details, please review our Privacy Policy.',
    category: 'Account & Privacy'
  },
  {
    question: 'How do I delete my account?',
    answer: 'You can request account deletion by contacting us at contact@etheriasystems.online. We will process your request within 30 days and confirm once your data has been removed from our systems.',
    category: 'Account & Privacy'
  },
];

const categories = ['General', 'Subscriptions & Pricing', 'Beta Testing', 'Products', 'Technical Support', 'Account & Privacy'];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('General');
  const filtered = faqData.filter((f) => f.category === activeCategory);

  const categoryIcons: Record<string, string> = {
    'General': '✦',
    'Subscriptions & Pricing': '♔',
    'Beta Testing': '✧',
    'Products': '✦',
    'Technical Support': '✧',
    'Account & Privacy': '♔',
  };

  return (
    <div className="min-h-screen pb-16">
      {/* ═════ HERO ═════ */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-8 bg-[#0a0a0b]">
        <div className="absolute top-20 left-1/3 w-64 h-64 rounded-full bg-[#c9a227]/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 rounded-full bg-[#c9a227]/3 blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <HelpCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#c9a227] mx-auto mb-6 sm:mb-8" />
          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 text-[#f5f5f5] tracking-wider drop-shadow-lg">
            Frequently Asked Questions
          </h1>
          <p className="text-[#a3a3a3] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Answers to the questions most commonly asked by our community of seekers
          </p>
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mt-8 sm:mt-12" />
        </div>
      </section>

      {/* ═════ CATEGORY TABS ═════ */}
      <section className="sticky top-[72px] z-40 bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-cinzel text-xs sm:text-sm tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#c9a227] text-[#0a0a0b] border-[#c9a227]'
                  : 'bg-transparent text-[#a3a3a3] border-[#262626] hover:border-[#c9a227]/50 hover:text-[#c9a227]'
              }`}
            >
              <span className="mr-1.5">{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═════ FAQ CONTENT — ALL ANSWERS VISIBLE ═════ */}
      <section className="py-12 sm:py-20 px-6 sm:px-8 bg-[#0f0f10]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-cinzel text-2xl sm:text-3xl text-[#f5f5f5] mb-8 sm:mb-12 flex items-center gap-3">
            <Crown className="w-6 h-6 text-[#c9a227]" />
            {activeCategory}
          </h2>

          <div className="space-y-6">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#262626] rounded-xl bg-gradient-to-b from-[#0f0f10] to-[#0a0a0b] overflow-hidden hover:border-[#c9a227]/30 transition-all duration-300"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="font-cinzel text-sm sm:text-base text-[#f5f5f5] tracking-wider leading-relaxed mb-3">
                    {item.question}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-[#c9a227]/20 to-transparent mb-4" />
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 p-8 sm:p-10 border border-[#c9a227]/20 rounded-2xl bg-[rgba(201,162,39,0.03)] text-center">
            <Sparkles className="w-10 h-10 text-[#c9a227] mx-auto mb-4" />
            <h3 className="font-cinzel text-xl sm:text-2xl text-[#f5f5f5] mb-3">
              Still Have Questions?
            </h3>
            <p className="text-[#a3a3a3] text-sm sm:text-base mb-6 max-w-lg mx-auto">
              If you could not find the answer you were looking for, our team is always here to help guide you on your journey.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel text-base tracking-wider rounded-lg transition-all duration-300 hover:bg-[#f5f5f5]"
            >
              Contact Us
            </Link>
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
            <Link to="/faq" className="text-[#c9a227] transition-colors">FAQ</Link>
            <span className="text-[#6b6b8a]">|</span>
            <Link to="/contact" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Contact</Link>
            <span className="text-[#6b6b8a]">|</span>
            <Link to="/credits" className="text-[#a0a0b8] hover:text-[#00e5e5] transition-colors">Credits</Link>
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent mx-auto" />
          <p className="text-[#6b6b8a] text-xs">&copy; {new Date().getFullYear()} Etheria Systems. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
