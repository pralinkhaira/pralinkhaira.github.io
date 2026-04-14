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
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b-2 dark:border-white/5 border-gray-200"
    >
      <div className="max-w-4xl">
        {/* Dynamic Text */}
        <div className="flex items-baseline gap-2 sm:gap-4 mb-6">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold dark:text-white text-gray-900 whitespace-nowrap"
          >
            I'm a
          </motion.span>
          <div className="h-[50px] sm:h-[70px] lg:h-[90px] overflow-hidden relative">
            {/* Decorative floating elements */}
            <div className="absolute -top-3 -left-6 w-8 h-8 bg-gradient-to-br from-brand to-brand-2 rounded-full animate-pulse-glow z-[-1] opacity-50" />
            
            <div className="relative h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="flex items-center"
                >
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-900 dark:from-brand dark:to-brand-2 dark:animate-text-glow">
                    {roles[activeRoleIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg dark:text-gray-400 text-gray-600 leading-relaxed mb-8 max-w-3xl"
        >
          {heroDescription}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3"
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
