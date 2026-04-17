import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Award, ArrowRight } from 'lucide-react';
import { mainCertifications, additionalCertifications } from '../data/portfolioData';

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-[24px] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative h-full dark:bg-gray-900/90 bg-white rounded-[20px] overflow-hidden border dark:border-white/10 border-gray-200 transition-all duration-300 flex flex-col backdrop-blur-xl">
        <div className="h-44 overflow-hidden relative">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4">
            <div className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-md border border-white/10 text-brand">
              <Award size={18} />
            </div>
          </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-brand uppercase tracking-widest">{cert.date}</span>
            <div className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="text-[10px] font-black dark:text-gray-500 text-gray-400 uppercase tracking-widest">{cert.issuer}</span>
          </div>
          <h5 className="text-base font-bold dark:text-white text-gray-900 mb-4 flex-1 line-clamp-2 group-hover:text-brand transition-colors">
            {cert.title}
          </h5>
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-black text-brand uppercase tracking-[0.15em] group/link transition-all"
          >
            <span>Verify License</span>
            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
      id="certifications"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-brand/10 text-brand border border-brand/20 rounded-full"
          >
            Achievements
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6 tracking-tight font-outfit">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
            A testament to my continuous learning journey and specialized skills in technology and security.
          </p>
        </motion.div>

        {/* Main Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainCertifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPopup(true)}
            className="group relative px-10 py-4 bg-brand text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl shadow-brand/20 hover:shadow-brand/40 overflow-hidden"
          >
            <span className="relative z-10">View More Credentials</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl overflow-y-auto pt-20 pb-10 px-4"
            onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative max-w-7xl mx-auto dark:bg-gray-900/50 bg-white rounded-[32px] p-8 md:p-12 border dark:border-white/10 border-gray-200"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-3xl font-black dark:text-white text-gray-900 tracking-tight mb-2">Additional Credentials</h3>
                  <div className="w-12 h-1 bg-brand rounded-full" />
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/10 active:scale-95"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {additionalCertifications.map((cert, i) => (
                  <CertCard key={i} cert={cert} index={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
