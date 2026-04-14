import { motion } from 'framer-motion';
import { Code, Shield, Globe, Wrench, Boxes } from 'lucide-react';
import { skills } from '../data/portfolioData';

const iconMap = {
  Code: Code,
  Shield: Shield,
  Globe: Globe,
  Wrench: Wrench,
  Boxes: Boxes,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-20 px-4 lg:px-8 border-b-2 dark:border-white/5 border-gray-200"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h6 className="text-brand font-bold text-sm uppercase tracking-widest mb-2">Skills</h6>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold dark:text-white text-gray-900">
            My Technical Proficiency
          </h1>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative dark:bg-gray-900/50 bg-white/70 rounded-2xl p-6 border-2 border-brand/30 transition-all duration-500 text-center"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/5 to-transparent opacity-0 transition-opacity duration-500" />

                <div className="relative z-10">
                  {Icon && (
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center transition-colors">
                      <Icon size={32} className="text-brand" />
                    </div>
                  )}
                  <h5 className="text-lg font-bold dark:text-white text-gray-900 mb-2">{skill.title}</h5>
                  <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed">{skill.items}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
