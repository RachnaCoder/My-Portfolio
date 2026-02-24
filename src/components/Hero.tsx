import React from 'react';
import { motion } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin, ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const stats = [
    { label: 'Projects', value: '4+' },
    { label: 'Git Commits', value: '180+' },
    { label: 'Experience', value: 'Fresher' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-indigo-500 font-semibold tracking-wider uppercase mb-4">Welcome to my universe</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            I'm <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">Rachna Yadav</span>
            <br />
            <span className="text-3xl md:text-5xl">
              <Typewriter
                words={['Full-Stack Developer', 'MERN Specialist', 'UI/UX Enthusiast', 'Problem Solver']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            BCA Final Year student from Lucknow, India. Crafting digital experiences with modern technologies and a touch of creativity.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#projects"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
            >
              View Projects <ArrowRight size={20} />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-gray-300 dark:border-zinc-700 hover:border-indigo-500 text-gray-700 dark:text-gray-300 rounded-full font-semibold transition-all"
            >
              Hire Me
            </a>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/RachnaCoder" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/rachna-yadav123/" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-3xl rotate-6 blur-sm opacity-20 animate-pulse" />
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <img
                src="https://picsum.photos/seed/suraj/800/800"
                alt="Rachna Yadav"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 z-20">
              <div className="grid grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-indigo-500">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
