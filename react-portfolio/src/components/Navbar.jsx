import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navLinks, profileImages } from '../data/portfolioData';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % profileImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Mobile Navbar */}
      <nav
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 transition-all duration-300 ${
          scrolled
            ? 'dark:bg-gray-900 bg-white/95 backdrop-blur-lg shadow-lg shadow-black/20'
            : 'dark:bg-gray-900 bg-white/80 backdrop-blur-md'
        }`}
      >
        <span className="text-lg font-bold dark:text-white text-gray-900">Pralin Khaira.</span>
        <div className="flex items-center gap-3">
          <div className="scale-75 origin-right flex items-center justify-center">
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white dark:text-white dark:hover:bg-white/20 hover:bg-black/10 text-gray-900 hover:text-black transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-gray-950/95 backdrop-blur-xl transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-16">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              spy={true}
              smooth={true}
              offset={-64}
              duration={500}
              onClick={closeMenu}
              className="text-xl font-semibold dark:text-gray-300 text-gray-700 hover:text-brand cursor-pointer transition-colors uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-screen w-60 z-50 flex-col items-center py-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(3, 14, 16, 0.85), rgba(3, 14, 16, 0.85)), url('/images/${theme === 'dark' ? 'nb-n' : 'nb-d'}.png')`,
        }}
      >
        {/* Profile Image Slideshow */}
        <div className="relative w-[180px] h-[180px] mb-6">
          {profileImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Pralin Khaira"
              className={`absolute inset-0 w-full h-full object-cover rounded-full border-[6px] border-brand transition-opacity duration-1000 ${
                i === activeImage ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Nav Links */}
        <div className="flex flex-col items-center justify-center gap-3 flex-1 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              spy={true}
              smooth={true}
              offset={-20}
              duration={500}
              activeClass="!text-brand"
              className="text-xs font-bold text-white/80 hover:text-brand cursor-pointer transition-colors uppercase tracking-widest py-2 px-4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle */}
        <div className="mt-4 hover:scale-105 transition-transform flex items-center justify-center">
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </>
  );
}
