import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { mainCertifications, additionalCertifications } from '../data/portfolioData';

function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="dark:bg-gray-900/50 bg-white/70 rounded-2xl overflow-hidden border dark:border-white/5 border-gray-200 transition-all duration-500 flex flex-col"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-brand text-xs font-semibold mb-1">{cert.date}</p>
        <h5 className="text-base font-bold dark:text-white text-gray-900 mb-2 flex-1">{cert.title}</h5>
        <p className="text-brand/80 text-sm mb-3">{cert.issuer}</p>
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all w-fit"
        >
          <ExternalLink size={14} />
          View Certificate
        </a>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section
      id="certifications"
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b-2 dark:border-white/5 border-gray-200"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">
            Certifications
          </h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            My Learnings
          </h1>
        </motion.div>

        {/* Main Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCertifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setShowPopup(true)}
            className="px-8 py-3 rounded-xl bg-brand text-white font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/30 hover:bg-brand-2"
          >
            View All Other!
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
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-lg overflow-y-auto py-10 px-4"
            onClick={(e) => e.target === e.currentTarget && setShowPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl mx-auto bg-gray-950 rounded-3xl p-8 pt-16 border dark:border-white/10 border-gray-300 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:dark:text-white text-gray-900 hover:bg-brand transition-all duration-300 hover:rotate-90"
              >
                <X size={22} />
              </button>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalCertifications.map((cert, i) => (
                  <CertCard key={cert.title} cert={cert} index={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
