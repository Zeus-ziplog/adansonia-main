import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { api } from '../lib/api';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  practiceArea: string;
  image?: string;
  client?: string;
  outcome?: string;
}

export default function CaseStudies() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [filtered, setFiltered] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [areas, setAreas] = useState<string[]>([]);

  useEffect(() => {
    api.getCaseStudies()
      .then(data => {
        setItems(data);
        setFiltered(data);
        const uniqueAreas = Array.from(new Set(data.map(c => c.practiceArea).filter(Boolean))) as string[];
        setAreas(['All', ...uniqueAreas]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = items;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(term) || 
        c.description.toLowerCase().includes(term) ||
        c.client?.toLowerCase().includes(term)
      );
    }
    if (selectedArea !== 'All') {
      filtered = filtered.filter(c => c.practiceArea === selectedArea);
    }
    setFiltered(filtered);
  }, [searchTerm, selectedArea, items]);

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
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-4">
          Case Studies
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Real results from our client partnerships.
        </p>

        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-jade dark:focus:ring-pistachio focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-jade dark:focus:ring-pistachio bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Showing {filtered.length} of {items.length} case studies
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
            >
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-deep-forest dark:text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-jade dark:text-pistachio mb-3">{item.practiceArea}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{item.description}</p>
                {item.client && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <strong>Client:</strong> {item.client}
                  </p>
                )}
                {item.outcome && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Outcome:</strong> {item.outcome}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No case studies match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}