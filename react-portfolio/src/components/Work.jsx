import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Code2, Globe2, Rocket } from 'lucide-react';
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
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-[600px] h-[600px] bg-brand-2/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-brand/10 text-brand border border-brand/20 rounded-full"
          >
            Portfolio
          </motion.span>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black dark:text-white text-gray-900 mb-8 tracking-tighter leading-tight">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl dark:text-gray-400 text-gray-600 leading-relaxed">
            A curated selection of my latest work, ranging from web applications to specialized security tools.
          </p>
        </motion.div>

        {/* Project Filters - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                activeFilter === filter
                  ? 'bg-brand text-white border-brand shadow-xl shadow-brand/20 -translate-y-1'
                  : 'bg-white/5 dark:text-gray-400 text-gray-600 dark:border-white/10 border-gray-200 hover:border-brand/50 hover:text-brand dark:hover:bg-white/10 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            const excludeDescRepos = ['Insta-Cypher', 'directory-watchdog', 'File-Organization-Script', 'Code-Snippet-Manager', 'Memory-Game'];
            const showDescription = repoName && excludeDescRepos.includes(repoName) ? '0' : '1';
            const displayHoverUrl = (project.liveUrl || project.demoUrl) ? null : project.hoverUrl;

            return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group relative h-full"
            >
              {/* Animated Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-[28px] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />

              <div className="relative h-full dark:bg-gray-900/90 bg-white rounded-[24px] overflow-hidden border dark:border-white/10 border-gray-200 transition-all duration-500 flex flex-col backdrop-blur-xl group-hover:dark:bg-gray-900/95 shadow-2xl shadow-black/5">
                
                {/* Image Container */}
                <div className="h-52 overflow-hidden relative">
                  <div 
                    className="w-full h-full relative md:cursor-pointer"
                    onClick={() => {
                      const url = project.liveUrl || project.demoUrl;
                      if (window.innerWidth >= 768 && url) {
                        setInteractivePreview({ ...project, liveUrl: url });
                      }
                    }}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${displayHoverUrl ? 'group-hover:opacity-0' : 'group-hover:scale-110 group-hover:rotate-1'}`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : repoName ? (
                      <div className={`w-full h-full transition-all duration-700 ${displayHoverUrl ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}>
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
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/10 to-brand-2/10">
                        <Rocket size={40} className="text-brand opacity-20" />
                      </div>
                    )}

                    {displayHoverUrl && (
                      <img
                        src={displayHoverUrl}
                        alt={`${project.title} Hover`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                      />
                    )}

                    {(project.liveUrl || project.demoUrl) && (
                      <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 items-center justify-center backdrop-blur-none group-hover:backdrop-blur-[2px] z-20">
                        <span className="opacity-0 group-hover:opacity-100 bg-brand text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl shadow-brand/40 translate-y-4 group-hover:translate-y-0">
                          Launch Preview
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    {project.categories.map(cat => (
                      <span key={cat} className="text-[10px] font-black text-brand uppercase tracking-widest">{cat}</span>
                    ))}
                  </div>
                  
                  <h4 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-brand transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-5">
                    {(project.demoUrl || project.liveUrl) && (
                      <button
                        onClick={(e) => {
                          const url = project.demoUrl || project.liveUrl;
                          if (window.innerWidth >= 768) {
                            e.preventDefault();
                            setInteractivePreview({ ...project, liveUrl: url });
                          } else {
                            window.open(url, '_blank');
                          }
                        }}
                        className="flex items-center gap-2 text-[11px] font-black text-brand uppercase tracking-[0.15em] group/btn transition-all cursor-pointer"
                      >
                        <Globe2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        <span>Live Preview</span>
                        <div className="w-0 group-hover/btn:w-4 h-[1px] bg-brand transition-all" />
                      </button>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[11px] font-black text-brand uppercase tracking-[0.15em] group/btn transition-all"
                      >
                        <Code2 size={16} className="group-hover/btn:rotate-12 transition-transform" />
                        <span>Source Code</span>
                        <div className="w-0 group-hover/btn:w-4 h-[1px] bg-brand transition-all" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* GitHub Contribution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 dark:bg-white/5 bg-gray-50 rounded-[40px] border dark:border-white/10 border-gray-200 text-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-brand-2 to-brand group-hover:scale-x-110 transition-transform duration-1000" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand/10 text-brand mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <FaGithub size={32} />
            </div>
            <h3 className="text-3xl font-black dark:text-white text-gray-900 mb-6 tracking-tight">
              Looking for <span className="gradient-text">more?</span>
            </h3>
            <p className="dark:text-gray-400 text-gray-600 mb-10 text-lg leading-relaxed">
              Explore my full repository for deeper insights into my coding style, experimental scripts, and open-source contributions.
            </p>
            <a
              href="https://github.com/pralinkhaira"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-2 hover:shadow-[0_20px_40px_rgba(0,191,255,0.3)] hover:-translate-y-1 transition-all duration-500"
            >
              Github Repository
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Background Highlight */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand/5 blur-[80px] rounded-full group-hover:bg-brand/10 transition-colors duration-700" />
        </motion.div>
      </div>

      {/* Interactive Terminal / Modal System */}
      <AnimatePresence>
        {interactivePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setInteractivePreview(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-7xl h-[88vh] bg-gray-950 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col border border-white/10 ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Controls */}
              <div className="flex justify-between items-center bg-gray-900/50 backdrop-blur-xl border-b border-white/5 px-8 py-5 shrink-0">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="flex items-center gap-2 font-black text-[10px] tracking-[0.25em] text-brand uppercase">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                      </span>
                      Global Network Preview
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{interactivePreview.title}</h3>
                </div>
                
                <div className="flex items-center gap-5">
                  <a 
                    href={interactivePreview.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/5 hover:bg-brand text-white px-6 py-2.5 rounded-xl transition-all duration-300 text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-white/10 hover:border-brand"
                  >
                    Site
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <button 
                    onClick={() => setInteractivePreview(null)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all border border-white/10 active:scale-95"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Iframe Viewport */}
              <div className="w-full flex-grow bg-white relative">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-950 -z-10">
                  <div className="flex flex-col items-center gap-5">
                    <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Connecting to Instance...</span>
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
