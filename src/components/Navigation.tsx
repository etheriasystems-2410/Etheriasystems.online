import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/quantum-ai', label: 'Quantum AI' },
    { path: '/products', label: 'Products' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/donate', label: 'Donate' },
    { path: '/contact', label: 'Contact' },
    { path: '/credits', label: 'Credits' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 bg-[rgba(10,10,11,0.9)] backdrop-blur-xl border-b border-[#262626]">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link to="/" className="font-cinzel text-[#f5f5f5] no-underline text-[1.1rem] tracking-[0.15em]">
          Etheria Systems
        </Link>

        <button
          ref={buttonRef}
          className="bg-none border-none text-[#f5f5f5] text-2xl cursor-pointer z-[102] p-2 hover:text-[#c9a227] transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '\u2715' : '\u2630'}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`absolute top-full left-0 right-0 bg-[rgba(10,10,11,0.98)] border-b border-[#262626] transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-8 py-4 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-cinzel text-lg tracking-[0.1em] py-3 px-4 rounded transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-[#c9a227] bg-[rgba(201,162,39,0.1)]'
                    : 'text-[#f5f5f5] hover:text-[#c9a227] hover:bg-[rgba(201,162,39,0.05)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
