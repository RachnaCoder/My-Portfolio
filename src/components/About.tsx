import React from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AboutProps {
  bio: string;
}

export default function About({ bio }: AboutProps) {
  const radarData = [
    { subject: 'MERN', A: 95, fullMark: 100 },
    { subject: 'Java', A: 85, fullMark: 100 },
    { subject: 'React', A: 80, fullMark: 100 },
    { subject: 'Python', A: 75, fullMark: 100 },
    { subject: 'UI/UX', A: 88, fullMark: 100 },
    { subject: 'Backend', A: 92, fullMark: 100 },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Me
          </motion.h2>
          <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              I'm a visionary developer building the future.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {bio}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="text-indigo-500 font-bold text-xl mb-1">Education</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">BCA Final Year, BBDU</div>
              </div>
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="text-emerald-500 font-bold text-xl mb-1">Location</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Lucknow, India</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[400px] w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-zinc-800"
          >
            <h4 className="text-center text-gray-500 uppercase tracking-widest text-xs mb-4">Skills Radar</h4>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#4f46e5" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Radar
                  name="Suraj"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
