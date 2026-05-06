import { useState, useRef } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_6z9jgu4',
        'template_tn3y356',
        formRef.current,
        'NeRTncHTEXe2_WYYe'
      );
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="py-20 px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="w-16 h-16 text-[#c9a227] mx-auto mb-6" />
          <h1 className="font-cinzel text-5xl md:text-6xl mb-6 text-[#f5f5f5]">Contact Us</h1>
          <p className="text-xl text-[#a3a3a3] max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-8 bg-[#0f0f10]">
        <div className="max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#f5f5f5] mb-2 font-cinzel">
                <User className="w-4 h-4 inline mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#262626] rounded-lg text-[#f5f5f5] focus:border-[#c9a227] focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#f5f5f5] mb-2 font-cinzel">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#262626] rounded-lg text-[#f5f5f5] focus:border-[#c9a227] focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#f5f5f5] mb-2 font-cinzel">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#0a0a0b] border border-[#262626] rounded-lg text-[#f5f5f5] focus:border-[#c9a227] focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#c9a227] text-[#0a0a0b] font-cinzel tracking-wider rounded transition-all duration-300 hover:bg-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-400 text-center">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-400 text-center">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 px-8 bg-[#0a0a0b]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cinzel text-2xl mb-8 text-[#f5f5f5]">Connect With Us</h2>
          <div className="flex justify-center gap-8">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/profile.php?id=61579689645750" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 border border-[#262626] rounded-xl bg-[#0f0f10] transition-all duration-300 hover:border-[#c9a227]/50 hover:bg-[#0f0f10]/80"
            >
              <svg 
                className="w-10 h-10 text-[#c9a227] group-hover:text-[#f5f5f5] transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="font-cinzel text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">Facebook</span>
            </a>

            {/* WhatsApp */}
            <a 
              href="https://api.whatsapp.com/send?phone=16152603626&text=Hello%20Etheria%20Systems" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 border border-[#262626] rounded-xl bg-[#0f0f10] transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#0f0f10]/80"
            >
              <svg 
                className="w-10 h-10 text-[#25D366] group-hover:text-[#128C7E] transition-colors" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="font-cinzel text-[#a3a3a3] group-hover:text-[#f5f5f5] transition-colors">WhatsApp</span>
            </a>
          </div>
          <p className="mt-8 text-[#737373] text-sm max-w-md mx-auto italic">
            Please allow 48 hours for response before contacting again due to the extremely small staff size of our company - The Developer
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
      </section>
    </div>
  );
}
