import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { roles, heroDescription, heroButtons } from '../data/portfolioData';
import SocialCard from './SocialCard';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b-2 dark:border-white/5 border-gray-200"
    >
      <div className="max-w-4xl">
        {/* Dynamic Text */}
        <div className="flex items-center gap-4 mb-6">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-light dark:text-gray-100 text-gray-900 whitespace-nowrap"
          >
            I'm a
          </motion.span>
          <div className="h-[50px] sm:h-[70px] lg:h-[90px] overflow-hidden relative">
            {/* Decorative floating elements */}
            <div className="absolute -top-3 -left-6 w-8 h-8 bg-gradient-to-br from-brand to-brand-2 rounded-full animate-pulse-glow z-[-1] opacity-50" />
            <div className="absolute -bottom-3 -right-6 w-5 h-5 bg-gradient-to-br from-brand-2 to-brand rounded-full animate-pulse-glow z-[-1] opacity-50" style={{ animationDelay: '1s' }} />

            <div className="animate-slide">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="h-[50px] sm:h-[70px] lg:h-[90px] flex items-center pr-2"
                >
                  <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-900 dark:from-brand dark:to-brand-2 dark:animate-text-glow lg:-mt-2 pb-2">
                    {role}
                  </span>
                </div>
              ))}
              {/* Duplicate first for seamless loop */}
              <div className="h-[50px] sm:h-[70px] lg:h-[90px] flex items-center pr-2">
                <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-blue-900 dark:from-brand dark:to-brand-2 dark:animate-text-glow lg:-mt-2 pb-2">
                  {roles[0]}
                </span>
              </div>
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
              className="group relative overflow-hidden px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/30 hover:bg-brand-2"
            >
              <span className="inline-block transition-all duration-300 group-hover:opacity-0">
                {btn.text}
              </span>
              <span className="absolute inset-0 flex items-center justify-center text-xl transition-all duration-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
                {btn.icon === 'linkedin' ? <FaLinkedin size={22} /> : btn.icon}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
