import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, FileText, Mail, Phone } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { roles, heroDescription, heroButtons } from '../data/portfolioData';

const buttonIconMap = {
  rocket: Rocket,
  file: FileText,
  mail: Mail,
  phone: Phone,
  linkedin: FaLinkedin,
};

export default function Hero() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden relative"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Dynamic Text - Centered */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight dark:text-white text-gray-900 font-outfit"
          >
            I'm a
          </motion.span>
          <div className="h-[50px] sm:h-[70px] lg:h-[90px] overflow-hidden relative w-full">
            <div className="relative h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  className="flex items-center justify-center font-outfit"
                >
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand via-brand-2 to-brand animate-text-glow">
                    {roles[activeRoleIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Description - Centered */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl dark:text-gray-400 text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          {heroDescription}
        </motion.p>

        {/* CTA Buttons - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {heroButtons.map((btn, i) => (
            <a
              key={i}
              href={btn.href}
              target={btn.external ? '_blank' : undefined}
              rel={btn.external ? 'noopener noreferrer' : undefined}
              className="group relative overflow-hidden px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/30 hover:bg-brand-2"
            >
              <span className="inline-block transition-all duration-300 group-hover:opacity-0">
                {btn.text}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-xl transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                {(() => {
                  const Icon = buttonIconMap[btn.icon];
                  return Icon ? <Icon size={22} /> : btn.icon;
                })()}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
