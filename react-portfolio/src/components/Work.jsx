import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects, projectFilters } from '../data/portfolioData';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [interactivePreview, setInteractivePreview] = useState(null);

  useEffect(() => {
    if (interactivePreview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [interactivePreview]);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <section
      id="work"
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
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Work</h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            My Recent Projects!
          </h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-brand text-white border-brand shadow-lg shadow-brand/20'
                  : 'bg-transparent dark:text-gray-400 text-gray-600 dark:border-gray-700 border-gray-300 hover:border-brand hover:text-brand'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => {
            const patterns = ['Signal', 'Charlie+Brown', 'Formal+Invitation', 'Plus', 'Circuit+Board', 'Overlapping+Hexagons', 'Brick+Wall', 'Floating+Cogs', 'Diagonal+Stripes'];
            const pattern = patterns[i % patterns.length];
            
            let repoName = null;
            let repoOwner = 'pralinkhaira';
            if (project.codeUrl && project.codeUrl.includes('github.com/')) {
              const parts = project.codeUrl.split('github.com/')[1].split('/');
              if (parts.length >= 2) {
                repoOwner = parts[0];
                repoName = parts[1];
              }
            }

            // Exclude description tag for specified repos
            const excludeDescRepos = ['Insta-Cypher', 'directory-watchdog', 'File-Organization-Script', 'Code-Snippet-Manager', 'Memory-Game'];
            const showDescription = repoName && excludeDescRepos.includes(repoName) ? '0' : '1';

            // Override hoverUrl parsing if interactive preview exists
            const displayHoverUrl = (project.liveUrl || project.demoUrl) ? null : project.hoverUrl;

            return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dark:bg-gray-900/50 bg-white/70 rounded-2xl overflow-hidden border dark:border-white/5 border-gray-200 transition-all duration-500 flex flex-col"
            >
              {/* Image / Live Preview */}
              <div className="h-48 overflow-hidden dark:bg-gray-800/50 bg-gray-100/70 flex items-center justify-center relative group rounded-t-2xl">
                {/* Unified Project Thumbnail Container */}
                <div 
                  className="w-full h-full relative group md:cursor-pointer overflow-hidden rounded-t-2xl"
                  onClick={() => {
                    const url = project.liveUrl || project.demoUrl;
                    if (window.innerWidth >= 768 && url) {
                      setInteractivePreview({ ...project, liveUrl: url });
                    }
                  }}
                >
                  {/* LAYER 1: Base Content (Image, Socialify, or Iframe) */}
                  <div className="w-full h-full relative">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${displayHoverUrl ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : repoName ? (
                      <div className={`w-full h-full transition-all duration-500 ${displayHoverUrl ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}>
                        <img
                          src={`https://socialify.git.ci/${repoOwner}/${repoName}/image?description=${showDescription}&forks=1&issues=1&language=1&name=1&owner=1&pattern=${pattern}&pulls=1&stargazers=1&theme=Light`}
                          alt={`${project.title} Light`}
                          className="w-full h-full object-cover block dark:hidden"
                        />
                        <img
                          src={`https://socialify.git.ci/${repoOwner}/${repoName}/image?description=${showDescription}&forks=1&issues=1&language=1&name=1&owner=1&pattern=${pattern}&pulls=1&stargazers=1&theme=Dark`}
                          alt={`${project.title} Dark`}
                          className="w-full h-full object-cover hidden dark:block"
                        />
                      </div>
                    ) : project.liveUrl ? (
                      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/10 to-brand/5 p-8 text-center transition-all duration-500 ${displayHoverUrl ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}>
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em] mb-1">Interactive Preview</span>
                            <span className="text-sm font-bold dark:text-gray-300 text-gray-700 leading-tight">{project.title}</span>
                            <div className="w-8 h-0.5 bg-brand/30 rounded-full"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 text-center">
                        <span className="text-xs font-bold dark:text-gray-500 text-gray-400 uppercase tracking-widest leading-relaxed">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* LAYER 2: Hover Art (Bannerbear) */}
                  {displayHoverUrl && (
                    <img
                      src={displayHoverUrl}
                      alt={`${project.title} Hover`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    />
                  )}

                  {/* LAYER 3: Interactive CTA Overlay */}
                  {(project.liveUrl || project.demoUrl) && (
                    <div className="hidden md:flex absolute inset-0 bg-transparent group-hover:bg-black/40 transition-all duration-500 items-center justify-center backdrop-blur-none group-hover:backdrop-blur-[3px] z-20">
                      <span className="opacity-0 group-hover:opacity-100 bg-brand text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-2xl shadow-brand/40 translate-y-6 group-hover:translate-y-0">
                        Explore Project
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{project.title}</h4>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <button
                      onClick={(e) => {
                        if (window.innerWidth >= 768) {
                          e.preventDefault();
                          setInteractivePreview({ ...project, liveUrl: project.demoUrl });
                        } else {
                          window.open(project.demoUrl, '_blank');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      View Demo
                    </button>
                  )}
                  {project.liveUrl && (
                    <button
                      onClick={(e) => {
                        if (window.innerWidth >= 768) {
                          e.preventDefault();
                          setInteractivePreview(project);
                        } else {
                          window.open(project.liveUrl, '_blank');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      View Live
                    </button>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all"
                    >
                      <FaGithub size={14} />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="dark:text-gray-400 text-gray-600 mb-6 tracking-wide text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            Dive into the complete source code and architectural details of these projects on my GitHub. <br className="hidden md:block" />
            You'll also find a broader collection of my open-source tools, custom scripts, and technical explorations.
          </p>
          <a
            href="https://github.com/pralinkhaira"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-2 hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-1 transition-all duration-300 mx-auto"
          >
            <FaGithub size={20} />
            Explore My Repository
          </a>
        </motion.div>
      </div>

      {/* Interactive Modal Popup */}
      <AnimatePresence>
        {interactivePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setInteractivePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="w-full max-w-6xl h-[85vh] bg-gray-950 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col border border-white/10 ring-1 ring-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Modal Header */}
              <div className="flex justify-between items-center bg-gray-950/80 backdrop-blur-md border-b border-white/5 text-white px-6 py-4 shrink-0">
                <div className="flex flex-col">
                  <span className="flex items-center gap-2 font-black text-xs tracking-[0.2em] text-brand uppercase mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-brand animate-ping mr-1"></span>
                    Live Preview System
                  </span>
                  <h3 className="text-lg font-bold tracking-tight">{interactivePreview.title}</h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <a 
                    href={interactivePreview.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 hover:bg-brand text-white hover:text-white px-5 py-2 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-white/10 hover:border-brand hover:shadow-lg hover:shadow-brand/20"
                  >
                    <span>External View</span>
                    <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <button 
                    onClick={() => setInteractivePreview(null)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10"
                    title="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Iframe Wrapper */}
              <div className="w-full flex-grow bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950 -z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Loading Interactive Experience</span>
                  </div>
                </div>
                <iframe
                  src={interactivePreview.liveUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  title={interactivePreview.title}
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
