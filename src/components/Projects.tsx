import React from 'react';
import { motion } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                className="h-full"
              >
                <div className="h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-zinc-800 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white rounded-full text-black hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-white rounded-full text-black hover:bg-indigo-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
