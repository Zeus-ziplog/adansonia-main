import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { api } from '../lib/api';

interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  image_url: string;
  bio?: string;
}

export default function People() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    api.getStaff()
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-pistachio border-t-jade rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-4">
            Our People
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Meet the advocates dedicated to your success.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((person, index) => {
            const isExpanded = expandedId === person.id;
            const hasLongBio = person.bio && person.bio.length > 150;

            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div 
                  className="relative h-72 overflow-hidden cursor-pointer group"
                  onClick={() => hasLongBio && toggleExpand(person.id)}
                >
                  {person.image_url ? (
                    <img
                      src={person.image_url}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-jade', 'to-deep-forest');
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-jade to-deep-forest flex items-center justify-center">
                      <span className="text-white font-serif text-5xl">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {hasLongBio && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-deep-forest px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        {isExpanded ? 'Collapse Bio' : 'View Full Bio'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-1">
                    {person.name}
                  </h2>
                  <p className="text-jade dark:text-pistachio font-semibold mb-4 text-sm tracking-wide uppercase">
                    {person.role}
                  </p>

                  <div className="flex-grow">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        key={isExpanded ? 'expanded' : 'collapsed'}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {person.bio && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {isExpanded 
                              ? person.bio 
                              : `${person.bio.slice(0, 140)}${person.bio.length > 140 ? '...' : ''}`
                            }
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {hasLongBio && (
                      <button
                        onClick={() => toggleExpand(person.id)}
                        className="mt-3 flex items-center text-jade dark:text-pistachio hover:underline text-xs font-bold uppercase tracking-tighter"
                      >
                        {isExpanded ? (
                          <>Show Less <ChevronUp size={14} className="ml-1" /></>
                        ) : (
                          <>Read More <ChevronDown size={14} className="ml-1" /></>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Contact Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center">
                    <Mail size={14} className="text-jade mr-2" />
                    <a
                      href={`mailto:${person.email}`}
                      className="text-gray-500 dark:text-gray-400 hover:text-jade dark:hover:text-pistachio transition-colors text-sm font-medium truncate"
                    >
                      {person.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}