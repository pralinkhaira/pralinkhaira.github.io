import { useState, useEffect } from 'react';
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-950 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
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
