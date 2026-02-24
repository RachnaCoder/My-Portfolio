import React from 'react';
import { motion } from 'motion/react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Technical Expertise
          </motion.h2>
          <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
                <span className="text-sm text-indigo-500 font-bold">{skill.level}%</span>
              </div>
              <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {['Fast Learner', 'Team Player', 'Creative', 'Reliable'].map((trait, i) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 text-center rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800"
            >
              <div className="text-indigo-500 font-bold">{trait}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
