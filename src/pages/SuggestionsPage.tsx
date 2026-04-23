import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Lightbulb } from 'lucide-react';
import Footer from '../components/Footer';

const SuggestionsPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', suggestion: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative">
      <div className="fixed top-24 left-6 z-[200]">
        <Link to="/" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors font-cinzel text-sm tracking-wider">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      <section className="relative py-24 md:py-32 min-h-screen">
        <div className="absolute top-20 left-1/3 orb orb-1 opacity-50" />
        <div className="absolute bottom-40 right-1/4 orb orb-2 opacity-40" />

        <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto px-6 md:px-12" style={{ opacity: 0 }}>
          <h2 className="font-cinzel text-[clamp(28px,4vw,44px)] font-semibold tracking-[0.08em] text-foreground text-center mb-4">
            Suggestions
          </h2>
          <p className="text-center text-muted-foreground font-inter text-sm max-w-xl mx-auto mb-12">
            Have an idea to improve our apps? We&apos;d love to hear it.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-cinzel text-foreground text-sm tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-sm text-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-cinzel text-foreground text-sm tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-sm text-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="suggestion" className="block font-cinzel text-foreground text-sm tracking-wider mb-2">
                  Your Suggestion
                </label>
                <textarea
                  id="suggestion"
                  value={formData.suggestion}
                  onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-sm text-foreground font-inter text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder="Share your ideas, feature requests, or feedback..."
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Send size={18} />
                Submit Suggestion
              </button>
            </form>
          ) : (
            <div className="text-center p-8 bg-secondary/30 border border-primary/30 rounded-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Lightbulb size={32} className="text-primary" />
              </div>
              <h3 className="font-cinzel text-foreground text-xl tracking-wider mb-4">
                Thank You!
              </h3>
              <p className="text-foreground/70 font-inter text-sm">
                We appreciate your suggestion. Your feedback helps us improve and grow.
              </p>

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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SuggestionsPage;
