import { useState } from 'react';
import { motion } from 'framer-motion';
import { PopupModal } from 'react-calendly';
import toast from 'react-hot-toast';
import { api } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await api.sendContact(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      toast.success('Thank you! Your message has been sent.');
    } catch (err: any) {
      setStatus('error');
      const errorMessage = err.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We're here to help. Send us a message or schedule a direct call.
          </p>
        </header>

        {/* Action Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jade dark:focus:ring-pistachio focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jade dark:focus:ring-pistachio focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-jade dark:focus:ring-pistachio focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 bg-jade text-white font-semibold rounded-full hover:bg-pistachio hover:text-deep-forest transition-all disabled:opacity-50 shadow-lg active:scale-95"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Consultation Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center justify-center text-center p-8 h-full space-y-6"
          >
            <div className="p-6 bg-jade/10 dark:bg-pistachio/10 rounded-full">
              <svg className="w-12 h-12 text-jade dark:text-pistachio" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-deep-forest dark:text-white">Prefer a Call?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Skip the back-and-forth email and book a dedicated 30-minute consultation directly with our experts.
            </p>
            <button
              onClick={() => setIsCalendlyOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-deep-forest text-white dark:bg-pistachio dark:text-deep-forest font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
            >
              Schedule Consultation
            </button>
          </motion.div>
        </div>

        {/* Calendly Popup Modal */}
        <PopupModal
          url="https://calendly.com/ziplogziki/30min"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById('root')!}
        />
      </div>
    </div>
  );
}