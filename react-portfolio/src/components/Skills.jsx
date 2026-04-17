import { motion } from 'framer-motion';
import { Code, Shield, Globe, Wrench, Boxes, Cpu, Database, Layout, Terminal } from 'lucide-react';
import { skills } from '../data/portfolioData';

const iconMap = {
  Code: Code,
  Shield: Shield,
  Globe: Globe,
  Wrench: Wrench,
  Boxes: Boxes,
  Cpu: Cpu,
  Database: Database,
  Layout: Layout,
  Terminal: Terminal,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 lg:px-8 border-b dark:border-white/5 border-gray-200 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-2/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-brand/10 text-brand border border-brand/20 rounded-full"
          >
            Capabilities
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6 tracking-tight font-outfit">
            Technical <span className="gradient-text">Proficiency</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg dark:text-gray-400 text-gray-600 leading-relaxed">
            A comprehensive overview of my technical expertise and the tools I use to bring complex ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || Code;
            const skillList = skill.items.split(',').map(item => item.trim());

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Border Animation Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand to-brand-2 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
                
                <div className="relative h-full dark:bg-gray-900/90 bg-white border border-gray-200 dark:border-white/10 p-8 rounded-[22px] flex flex-col backdrop-blur-xl group-hover:dark:bg-gray-900/95 transition-all duration-300 shadow-2xl shadow-black/5">
                  
                  {/* Icon Section */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-2/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Icon size={28} className="text-brand" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_10px_rgba(0,191,255,0.8)]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-4 group-hover:text-brand transition-colors">
                    {skill.title}
                  </h3>

                  {/* Tags Cloud */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skillList.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-[13px] font-medium dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-600 rounded-lg border border-transparent dark:group-hover:border-white/10 group-hover:border-gray-200 transition-all duration-300 hover:dark:bg-brand/20 hover:bg-brand/10 hover:text-brand"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card Glow Component (Visible on Hover in Dark Mode) */}
                  <div className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 group-hover:opacity-10 dark:block hidden bg-gradient-to-br from-brand to-transparent transition duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
