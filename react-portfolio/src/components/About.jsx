import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Briefcase, GraduationCap, Star, ChevronRight, Award as AwardIcon, Globe as GlobeIcon } from 'lucide-react';
import { experiences, education, miscellaneous } from '../data/portfolioData';

const tabs = [
  { key: 'experience', label: 'Experience', icon: Briefcase },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'extra', label: 'Miscellaneous', icon: Star },
];

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative dark:bg-gray-900/90 bg-white p-8 rounded-[22px] border dark:border-white/10 border-gray-200 transition-all duration-300 flex flex-col h-full backdrop-blur-xl group-hover:dark:bg-gray-900/95">
        <div className="flex flex-col xl:flex-row justify-between xl:items-start mb-6 gap-4">
          <div>
            <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-1 group-hover:text-brand transition-colors">{item.title}</h4>
            <p className="text-brand font-black text-xs uppercase tracking-[0.2em]">{item.company}</p>
          </div>
          <div className="inline-flex shrink-0">
            <span className="text-brand text-[10px] font-black px-4 py-1.5 bg-brand/10 rounded-full border border-brand/20 tracking-widest uppercase">{item.period}</span>
          </div>
        </div>
        
        <div className="space-y-3 flex-grow mb-8">
          {item.points.map((point, i) => (
            <div key={i} className="flex gap-3 text-sm dark:text-gray-400 text-gray-600 leading-relaxed group/point">
              <ChevronRight size={14} className="shrink-0 mt-1 text-brand/50 group-hover/point:text-brand transition-colors" />
              <p>{point}</p>
            </div>
          ))}
        </div>

        {item.skills && (
          <div className="pt-6 border-t dark:border-white/10 border-gray-200 mt-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">Core Expertise</p>
            <div className="flex flex-wrap gap-2">
              {item.skills.split(',').map((skill, i) => (
                <span key={i} className="px-2 py-0.5 text-[11px] font-bold dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-500 rounded-md border dark:border-white/5 border-gray-200">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {item.links && (
          <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t dark:border-white/10 border-gray-200">
            {item.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[11px] font-black text-brand uppercase tracking-[0.15em] group/link transition-all"
              >
                <ExternalLink size={14} className="group-hover/link:rotate-12 transition-transform" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EducationCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative dark:bg-gray-900/90 bg-white p-8 rounded-[22px] border dark:border-white/10 border-gray-200 transition-all duration-300 backdrop-blur-xl group-hover:dark:bg-gray-900/95">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
          <div>
            <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-1 group-hover:text-brand transition-colors">{item.title}</h4>
            <p className="text-brand font-black text-xs uppercase tracking-[0.15em]">{item.institution}</p>
          </div>
          <span className="shrink-0 text-brand text-[10px] font-black px-4 py-1.5 bg-brand/10 rounded-full border border-brand/20 tracking-widest uppercase">{item.period}</span>
        </div>
        
        <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-6">{item.description}</p>
        
        <div className="flex items-center gap-3 p-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200">
          <div className="p-2 rounded-lg bg-brand/10 text-brand">
            <AwardIcon size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Performance</p>
            <p className="text-sm font-bold dark:text-white text-gray-900">{item.score}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MiscCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
      
      <div className="relative dark:bg-gray-900/90 bg-white p-8 rounded-[22px] border dark:border-white/10 border-gray-200 transition-all duration-300 backdrop-blur-xl h-full flex flex-col group-hover:dark:bg-gray-900/95">
        {item.image && (
          <div className="mb-6 overflow-hidden rounded-2xl relative">
             <div className="absolute inset-0 bg-brand/5 group-hover:opacity-0 transition-opacity" />
             <img src={item.image} alt={item.title} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
        )}
        
        <div className="mb-6">
          <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-2 group-hover:text-brand transition-colors">{item.title}</h4>
          <span className="text-[10px] font-black text-brand uppercase tracking-widest">{item.period}</span>
        </div>

        <div className="space-y-4 mb-8">
          {item.organizer && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                <GlobeIcon size={16} />
              </div>
              <p className="text-sm">
                <span className="text-gray-500 font-medium">Organizer: </span>
                {item.organizerUrl ? (
                  <a href={item.organizerUrl} target="_blank" rel="noopener noreferrer" className="text-brand font-bold hover:text-brand-2 transition-colors">
                    {item.organizer}
                  </a>
                ) : (
                  <span className="dark:text-white text-gray-900 font-bold">{item.organizer}</span>
                )}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-3">
            {item.details?.map((detail, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                  <ChevronRight size={16} />
                </div>
                <p className="text-sm">
                  <span className="text-gray-500 font-medium">{detail.label}: </span>
                  <span className="dark:text-white text-gray-900 font-bold">{detail.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-8 flex-grow">
          {item.points.map((point, i) => (
            <div key={i} className="flex gap-3 text-sm dark:text-gray-400 text-gray-600 leading-relaxed">
              <span className="text-brand/50 mt-1">•</span>
              <p>{point}</p>
            </div>
          ))}
        </div>

        {item.links && (
          <div className="flex flex-wrap gap-5 pt-6 border-t dark:border-white/10 border-gray-200">
            {item.links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[11px] font-black text-brand uppercase tracking-[0.15em] group/link transition-all"
              >
                <ExternalLink size={14} className="group-hover/link:rotate-12 transition-transform" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-brand/10 text-brand border border-brand/20 rounded-full"
          >
            About
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black dark:text-white text-gray-900 mb-6 tracking-tight">
            My Education & <span className="gradient-text">Experience</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
            A look into my academic foundation, professional experience, and the significant milestones that have shaped my career.
          </p>
        </motion.div>

        {/* Tabs - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === tab.key
                    ? 'bg-brand text-white border-brand shadow-xl shadow-brand/20 -translate-y-1'
                    : 'bg-white/5 dark:text-gray-400 text-gray-600 dark:border-white/10 border-gray-200 hover:border-brand/50 hover:text-brand dark:hover:bg-white/10'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {activeTab === 'experience' && experiences.map((item, i) => (
                <ExperienceCard key={i} item={item} index={i} />
              ))}
              {activeTab === 'education' && education.map((item, i) => (
                <EducationCard key={i} item={item} index={i} />
              ))}
              {activeTab === 'extra' && miscellaneous.map((item, i) => (
                <MiscCard key={i} item={item} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
