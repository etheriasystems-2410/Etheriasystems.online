import { Link } from 'react-router-dom';

export default function Footer() {
  return (
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
        <p className="text-[#6b6b8a] text-xs">
          &copy; {new Date().getFullYear()} Etheria Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
