import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            My Journey
          </motion.h2>
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-zinc-800 rounded-full" />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white dark:border-black z-10 shadow-lg shadow-indigo-500/50" />

                {/* Content */}
                <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12">
                  <div className="p-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold mb-2">
                      <Calendar size={16} />
                      <span className="text-sm uppercase tracking-wider">{item.period}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                      <Briefcase size={16} />
                      <span className="text-sm font-medium">{item.company}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
