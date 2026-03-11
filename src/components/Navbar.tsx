import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.people'), path: '/people' },
    { name: t('nav.capabilities'), path: '/capabilities' },
    { name: t('nav.insights'), path: '/insights' },
    { name: t('nav.joinUs'), path: '/join-us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2 sm:py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo + Company Name */}
            <Link to="/" className="flex items-center gap-2 sm:gap-4">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Adansonia Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-jade rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  A
                </div>
              )}
              <div className="min-w-0">
                <span className="block font-serif text-base sm:text-xl font-bold text-deep-forest dark:text-white leading-tight truncate">
                  ADANSONIA
                </span>
                <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-jade dark:text-pistachio font-semibold truncate">
                  {t('nav.subtitle', 'Kiamba Mbithi & Co. Advocates')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-jade dark:text-pistachio'
                      : 'text-deep-forest/80 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-pistachio transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} className="text-deep-forest" /> : <Sun size={20} className="text-pistachio" />}
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-2.5 border-2 border-jade text-jade dark:border-pistachio dark:text-pistachio font-semibold rounded-full hover:bg-jade hover:text-white dark:hover:bg-pistachio dark:hover:text-deep-forest transition-all duration-300"
              >
                {t('nav.scheduleConsultation')}
              </Link>
            </div>

            {/* Mobile Right Side */}
            <div className="flex lg:hidden items-center space-x-1 sm:space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} className="text-deep-forest" /> : <Sun size={20} className="text-pistachio" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-deep-forest dark:text-white hover:text-jade dark:hover:text-pistachio transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-deep-forest/95 dark:bg-gray-900/95 backdrop-blur-md z-40 transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 py-20 overflow-y-auto">
          <div className="w-full max-w-sm space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-center text-2xl text-white hover:text-pistachio transition-colors font-serif py-2"
              >
                {link.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  i18n.language === 'en'
                    ? 'bg-jade text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('sw')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  i18n.language === 'sw'
                    ? 'bg-jade text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Kiswahili
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  i18n.language === 'fr'
                    ? 'bg-jade text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Français
              </button>
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-8 px-8 py-3 bg-jade text-white rounded-full font-semibold hover:bg-pistachio hover:text-deep-forest transition-colors"
            >
              {t('nav.scheduleConsultation')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}