import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { blogs } from '../data/portfolioData';

export default function Blogs() {
  return (
    <section
      id="blogs"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 translate-x-1/3 w-[500px] h-[500px] bg-brand/5 blur-[100px] rounded-full pointer-events-none" />

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
            Insights
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black dark:text-white text-gray-900 mb-6 tracking-tight">
            Sharing What <span className="gradient-text">I've Learnt</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
            Exploring technical concepts, sharing tutorials, and documenting my journey as a developer and security enthusiast.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative h-full"
            >
              {/* Animated Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-[28px] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />

              <div className="relative h-full dark:bg-gray-900/90 bg-white rounded-[24px] overflow-hidden border dark:border-white/10 border-gray-200 transition-all duration-300 flex flex-col backdrop-blur-xl group-hover:dark:bg-gray-900/95 shadow-xl shadow-black/5">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4">
                    <div className="p-2 rounded-lg bg-gray-900/80 backdrop-blur-md border border-white/10 text-brand">
                      <BookOpen size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-3 line-clamp-2 group-hover:text-brand transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {blog.description}
                  </p>
                  
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black text-brand uppercase tracking-[0.15em] hover:text-brand-2 transition-all w-fit group/link"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Blogs CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="https://beyondcoding-19.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600 border border-gray-200 dark:border-white/10 font-bold hover:border-brand hover:text-brand transition-all duration-300"
          >
            Explore More on BeyondCoding
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
