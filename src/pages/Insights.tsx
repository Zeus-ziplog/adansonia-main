import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, ArrowRight, BookOpen } from 'lucide-react';
import { api } from '../lib/api';
import ShareButtons from '../components/ShareButtons'; // Ensure path is correct

interface Insight {
  id: string;
  title: string;
  content: string;
  published_date: string;
  published: boolean;
}

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    api.getInsights()
      .then(data => {
        const published = data
          .filter((i: Insight) => i.published)
          .sort((a: Insight, b: Insight) => 
            new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
          );
        setInsights(published);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pistachio border-t-jade rounded-full animate-spin" />
          <p className="text-jade font-medium animate-pulse">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-4">
              Legal <span className="text-jade dark:text-pistachio">Insights</span>
            </h1>
            <div className="w-20 h-1.5 bg-pistachio mb-6 rounded-full" />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Stay informed with the latest legal developments, firm news, and expert analysis from our team.
            </p>
          </motion.div>
        </header>

        {insights.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {insights.map((insight, index) => {
              const isExpanded = expandedId === insight.id;
              const hasLongContent = insight.content.length > 200;
              // Construct full URL for sharing (assumes slug-based routing or ID routing)
              const shareUrl = `${window.location.origin}/insights/${insight.id}`;

              return (
                <motion.article
                  key={insight.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-8"
                  onClick={() => hasLongContent && toggleExpand(insight.id)}
                >
                  <div className="flex items-center text-jade dark:text-pistachio text-sm font-semibold mb-4 bg-jade/5 dark:bg-pistachio/5 w-fit px-3 py-1 rounded-full">
                    <Calendar size={14} className="mr-2" />
                    {new Date(insight.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-4 group-hover:text-jade dark:group-hover:text-pistachio transition-colors cursor-pointer">
                    {insight.title}
                  </h2>

                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={isExpanded ? 'expanded' : 'collapsed'}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {isExpanded 
                          ? insight.content 
                          : `${insight.content.substring(0, 200)}${insight.content.length > 200 ? '...' : ''}`
                        }
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700 mt-6 flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Navigation Action */}
                    <div className="flex items-center">
                      {hasLongContent ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(insight.id);
                          }}
                          className="flex items-center text-deep-forest dark:text-white font-bold hover:gap-3 transition-all text-sm group/btn"
                        >
                          {isExpanded ? (
                            <>Close Article <ChevronUp size={18} className="ml-2 text-jade" /></>
                          ) : (
                            <>Read More <ArrowRight size={18} className="ml-2 text-jade transition-transform group-hover/btn:translate-x-1" /></>
                          )}
                        </button>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Full update shown</div>
                      )}
                    </div>

                    {/* Right: Social Sharing (New) */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <ShareButtons url={shareUrl} title={insight.title} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-gray-50 dark:bg-gray-800/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700"
          >
            <BookOpen size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-6" />
            <h3 className="text-2xl font-bold text-deep-forest dark:text-white mb-2">No insights yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Our experts are currently drafting new analysis. Please check back shortly for updates.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}