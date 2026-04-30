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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
        
        {/* Video Showcase Section */}
        <section className="py-12 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl aspect-video rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl shadow-brand/10 border dark:border-white/10 border-gray-200 relative group cursor-pointer"
            onClick={() => setIsVideoPlaying(true)}
          >
            {!isVideoPlaying ? (
              <>
                <img 
                  src="https://raw.githubusercontent.com/pralinkhaira/pralinkhaira.github.io/refs/heads/main/react-portfolio/src/assets/thumb.png" 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-brand/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center pl-2 shadow-[0_0_40px_rgba(0,191,255,0.4)] group-hover:scale-110 group-hover:bg-brand transition-all duration-500">
                    <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                className="w-full h-full"
                src="https://drive.google.com/file/d/1e47-jpu2tLvpwqqDudDuTbjGDJ6VcmPB/preview"
                title="About Me | Why You Should Pick Me | whoami | Pralin Khaira"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            )}
          </motion.div>
        </section>

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
