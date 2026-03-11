import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, Users, Briefcase, Award } from 'lucide-react';
import { api } from '../lib/api';

interface Capability {
  id: string;
  title: string;
  description: string;
  icon?: string;
  priority?: number;
}

export default function CapabilityDetail() {
  const { id } = useParams<{ id: string }>();
  const [capability, setCapability] = useState<Capability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.getCapabilityById(id)
      .then(data => setCapability(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'scale': return <Scale size={48} />;
      case 'users': return <Users size={48} />;
      case 'briefcase': return <Briefcase size={48} />;
      case 'award': return <Award size={48} />;
      default: return <Briefcase size={48} />;
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-pistachio border-t-jade rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !capability) {
    return (
      <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6">
        <h2 className="font-serif text-3xl text-deep-forest dark:text-white mb-4">Capability not found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">{error || 'The requested practice area does not exist.'}</p>
        <Link to="/capabilities" className="inline-flex items-center px-6 py-3 bg-jade text-white rounded-full hover:bg-pistachio hover:text-deep-forest transition">
          <ArrowLeft className="mr-2" size={18} />
          Back to Capabilities
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          to="/capabilities"
          className="inline-flex items-center text-jade dark:text-pistachio hover:text-pistachio dark:hover:text-jade mb-8 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to all capabilities
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-cream dark:bg-gray-800 rounded-3xl p-10 shadow-xl">
              <div className="w-20 h-20 bg-pistachio/20 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-8">
                <div className="text-jade dark:text-pistachio">
                  {getIcon(capability.icon)}
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-6">
                {capability.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {capability.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 sticky top-28">
              <h3 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-6">
                Related Services
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio transition-colors">
                  <Link to="/contact" className="flex items-center">
                    <span className="w-1 h-1 bg-jade rounded-full mr-3" />
                    Schedule a consultation
                  </Link>
                </li>
                <li className="text-gray-600 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio transition-colors">
                  <Link to="/people" className="flex items-center">
                    <span className="w-1 h-1 bg-jade rounded-full mr-3" />
                    Meet our experts
                  </Link>
                </li>
                <li className="text-gray-600 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio transition-colors">
                  <Link to="/insights" className="flex items-center">
                    <span className="w-1 h-1 bg-jade rounded-full mr-3" />
                    Read related insights
                  </Link>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-jade text-white rounded-full hover:bg-pistachio hover:text-deep-forest transition-colors font-medium"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}