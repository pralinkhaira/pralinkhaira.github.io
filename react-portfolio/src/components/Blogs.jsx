import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { blogs } from '../data/portfolioData';

export default function Blogs() {
  return (
    <section
      id="blogs"
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
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Blogs</h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            Sharing what I learnt
          </h1>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="dark:bg-gray-900/50 bg-white/70 rounded-2xl overflow-hidden border dark:border-white/5 border-gray-200 transition-all duration-500 flex flex-col"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h5 className="text-base font-bold dark:text-white text-gray-900 mb-2">{blog.title}</h5>
                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed mb-4 flex-1">
                  {blog.description}
                </p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-2 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand hover:after:w-full after:transition-all w-fit"
                >
                  <ExternalLink size={14} />
                  Read Blog
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Blogs CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 dark:text-gray-400 text-gray-600"
        >
          Please consider exploring my additional blogs available{' '}
          <a
            href="https://beyondcoding-19.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand hover:text-brand-2 transition-colors"
          >
            HERE
          </a>{' '}
          as well.
        </motion.p>
      </div>
    </section>
  );
}
