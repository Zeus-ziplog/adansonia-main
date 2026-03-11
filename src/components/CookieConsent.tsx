import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    // Optionally disable non-essential cookies here
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-jade/10 dark:bg-pistachio/10 p-3 rounded-full">
                    <Cookie className="w-6 h-6 text-jade dark:text-pistachio" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-bold text-deep-forest dark:text-white mb-1">
                      Cookie Consent
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
                      We use essential cookies to remember your preferences (like theme and language). 
                      By continuing to use our site, you agree to our{' '}
                      <Link to="/privacy-policy" className="text-jade dark:text-pistachio hover:underline">
                        Privacy Policy
                      </Link>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={declineCookies}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    Decline
                  </button>
                  <button
                    onClick={acceptCookies}
                    className="px-6 py-2 bg-jade text-white rounded-full hover:bg-pistachio hover:text-deep-forest transition-colors text-sm font-medium shadow-md"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}