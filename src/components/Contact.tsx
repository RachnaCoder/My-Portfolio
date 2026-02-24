import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setResponseMessage(data.message);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setResponseMessage('Failed to connect to server');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Get In Touch
          </motion.h2>
          <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Let's collaborate on your next big idea.</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Email</div>
                  <div className="text-gray-600 dark:text-gray-400">rachnayadav@example.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Phone</div>
                  <div className="text-gray-600 dark:text-gray-400">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Location</div>
                  <div className="text-gray-600 dark:text-gray-400">Lucknow, Uttar Pradesh, India</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={48} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{responseMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center font-medium">{responseMessage}</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
