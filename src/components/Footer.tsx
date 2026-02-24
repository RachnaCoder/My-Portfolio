import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent mb-2">
              RY.
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Building the digital future, one line of code at a time.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/RachnaCoder" className="text-gray-400 hover:text-indigo-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/rachna-yadav123/" className="text-gray-400 hover:text-indigo-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Rachna Yadav. All rights reserved.
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Lucknow
          </div>
        </div>
      </div>
    </footer>
  );
}
