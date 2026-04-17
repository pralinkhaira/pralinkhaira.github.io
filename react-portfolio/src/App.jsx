import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Skills from './components/Skills';
import Blogs from './components/Blogs';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 selection:bg-brand selection:text-white ${
      theme === 'dark' 
        ? 'bg-gray-950 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Noise Texture Overlay */}
      <div className="noise" />

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand to-brand-2 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Custom Cursor Follower (Desktop Only) */}
      <div 
        className="hidden lg:block cursor-follower"
        style={{ 
          transform: `translate(${mousePos.x - 20}px, ${mousePos.y - 20}px)`
        }}
      />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Content wrapper - offset for sidebar on desktop */}
      <div className="lg:pl-60 pt-16 lg:pt-0">
        <Hero />
        <Work />
        <About />
        <Skills />
        <Blogs />
        <Certifications />
        <Contact />
        <Footer />
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed top-10 right-10 z-50 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/30 transition-all duration-300 hover:scale-110 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        title="Back to top"
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}
