import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { experiences, education, miscellaneous } from '../data/portfolioData';

const tabs = [
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'extra', label: 'Miscellaneous' },
];

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="dark:bg-gray-900/50 bg-white/70 p-6 rounded-2xl border dark:border-white/5 border-gray-200 transition-all duration-500 flex flex-col h-full"
    >
      <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-2 gap-2">
        <h4 className="text-lg font-extrabold dark:text-white text-gray-900">{item.title}</h4>
        <div className="inline-flex shrink-0">
          <span className="text-brand text-xs font-bold px-3 py-1 bg-brand/10 dark:bg-brand/20 rounded-full border border-brand/20">{item.period}</span>
        </div>
      </div>
      <p className="text-brand-2 dark:text-brand font-bold text-sm mb-4 uppercase tracking-wide">{item.company}</p>
      
      <div className="space-y-2 flex-grow mb-4">
        {item.points.map((point, i) => (
          <p key={i} className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
            → {point}
          </p>
        ))}
      </div>

      {item.skills && (
        <p className="text-sm dark:text-gray-400 text-gray-500 pt-4 border-t dark:border-white/10 border-gray-200 mt-auto">
          <span className="text-brand dark:text-brand-2 font-bold uppercase text-xs tracking-widest mr-2">Skills</span>
          {item.skills}
        </p>
      )}

      {item.links && (
        <div className="flex flex-wrap gap-4 mt-3">
          {item.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all"
            >
              <ExternalLink size={12} />
              {link.text}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function EducationCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="dark:bg-gray-900/50 bg-white/70 p-6 rounded-2xl border dark:border-white/5 border-gray-200 transition-all duration-500"
    >
      <h4 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{item.title}</h4>
      <p className="text-brand text-sm font-semibold mb-1">{item.institution}</p>
      <p className="text-brand/80 text-sm mb-3">{item.period}</p>
      <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-2">{item.description}</p>
      <p className="text-brand text-sm font-semibold">{item.score}</p>
    </motion.div>
  );
}

function MiscCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="dark:bg-gray-900/50 bg-white/70 p-6 rounded-2xl border dark:border-white/5 border-gray-200 transition-all duration-500"
    >
      {item.image && (
        <img src={item.image} alt={item.title} className="w-full rounded-xl mb-4 object-cover" />
      )}
      <h4 className="text-lg font-bold dark:text-white text-gray-900 mb-1">{item.title}</h4>
      <p className="dark:text-gray-400 text-gray-600 text-sm mb-2">{item.period}</p>
      {item.organizer && (
        <p className="text-sm mb-2">
          <span className="text-brand font-semibold">Organised by: </span>
          {item.organizerUrl ? (
            <a href={item.organizerUrl} target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-2 transition-colors">
              {item.organizer}
            </a>
          ) : (
            <span className="dark:text-gray-400 text-gray-600">{item.organizer}</span>
          )}
        </p>
      )}
      {item.details?.map((detail, i) => (
        <p key={i} className="text-sm mb-1">
          <span className="text-brand font-semibold">{detail.label}: </span>
          <span className="dark:text-gray-400 text-gray-600">{detail.value}</span>
        </p>
      ))}
      <div className="space-y-1 mt-3">
        {item.points.map((point, i) => (
          <p key={i} className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">→ {point}</p>
        ))}
      </div>
      {item.links && (
        <div className="flex flex-wrap gap-4 mt-3">
          {item.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand hover:text-brand-2 transition-colors"
            >
              <ExternalLink size={12} />
              {link.text}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section
      id="about"
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
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">About</h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            My Education & Experience
          </h1>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-brand text-white shadow-lg shadow-brand/20'
                  : 'dark:bg-gray-800 bg-gray-50 dark:text-gray-400 text-gray-600 hover:bg-gray-700 hover:dark:text-white text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {experiences.map((item, i) => (
                <ExperienceCard key={item.title} item={item} index={i} />
              ))}
            </motion.div>
          )}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {education.map((item, i) => (
                <EducationCard key={item.title} item={item} index={i} />
              ))}
            </motion.div>
          )}
          {activeTab === 'extra' && (
            <motion.div
              key="extra"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {miscellaneous.map((item, i) => (
                <MiscCard key={item.title} item={item} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
