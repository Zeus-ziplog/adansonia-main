import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Scale, Users, Briefcase, Award, ChevronDown, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // ✅ import
import { api } from '../lib/api';

interface Capability {
  id: string;
  title: string;
  description: string;
  icon?: string;
  priority?: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export default function Home() {
  const { t } = useTranslation(); // ✅ translation hook
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.08]);
  const springY = useSpring(y1, { stiffness: 120, damping: 25 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    api.getCapabilities()
      .then(data => {
        const sorted = data.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0));
        setCapabilities(sorted.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api.getTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setTestimonialsLoading(false));
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'scale': return <Scale size={32} />;
      case 'users': return <Users size={32} />;
      case 'briefcase': return <Briefcase size={32} />;
      case 'award': return <Award size={32} />;
      default: return <Briefcase size={32} />;
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  return (
    <div className="relative pt-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: springY, scale, opacity: springOpacity }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center filter brightness-90 contrast-105"
            style={{ backgroundImage: 'url("/hero-home.jpg")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/80 via-deep-forest/50 to-transparent dark:from-gray-900/80 dark:via-gray-800/50" />
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-24 right-24 w-72 h-72 border border-pistachio/20 rounded-full dark:border-gray-700/20"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            >
              {t('hero.title')}
              <span className="block text-pistachio text-4xl md:text-5xl mt-2">
                {t('hero.subtitle')}
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center px-8 py-4 bg-jade text-white font-semibold rounded-full hover:bg-pistachio hover:text-deep-forest transition-all duration-300 text-lg shadow-xl hover:shadow-2xl dark:bg-dark-jade dark:hover:bg-pistachio/80"
              >
                {t('hero.freeConsultation')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/capabilities"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-deep-forest transition-all duration-300 text-lg dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:text-pistachio"
              >
                {t('hero.exploreServices')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white cursor-pointer hover:text-pistachio transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={36} />
        </motion.div>
      </section>

      {/* Video Background Capabilities Section */}
      <section className="relative py-28 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover filter brightness-95"
            poster="/practice-areas-poster.jpg"
            loading="lazy"
          >
            <source src="/practice-areas-bg.mp4" type="video/mp4" />
            <div className="absolute inset-0 bg-gradient-to-br from-jade/15 to-pistachio/15 dark:from-dark-jade/20 dark:to-gray-800/20" />
          </video>
          <div className="absolute inset-0 bg-deep-forest/50 dark:bg-gray-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 dark:text-gray-100">
              {t('capabilities.corePracticeAreas')}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto dark:text-gray-300">
              {t('capabilities.practiceAreasSubtitle')}
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white border-t-jade rounded-full"
              />
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.id}
                  variants={fadeInUp}
                  whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.4 } }}
                  className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/10 dark:border-gray-700/10 flex flex-col"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-pistachio/20 rounded-full flex items-center justify-center group-hover:bg-jade/30 transition-colors dark:bg-gray-700/30 dark:group-hover:bg-dark-jade/30">
                      <div className="text-jade group-hover:scale-110 transition-transform dark:text-pistachio">
                        {getIcon(cap.icon)}
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                      className="absolute -top-3 -right-3 w-10 h-10 bg-jade rounded-full flex items-center justify-center text-white text-sm font-bold dark:bg-dark-jade"
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-deep-forest mb-3 group-hover:text-jade transition-colors dark:text-gray-100 dark:group-hover:text-pistachio">
                    {cap.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow dark:text-gray-300">
                    {cap.description}
                  </p>
                  <Link
                    to={`/capabilities/${cap.id}`}
                    className="inline-flex items-center text-jade font-medium hover:text-pistachio transition-colors mt-auto dark:text-pistachio dark:hover:text-jade"
                  >
                    {t('capabilities.learnMore')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/capabilities"
              className="inline-flex items-center px-8 py-4 bg-white text-deep-forest font-semibold rounded-full hover:bg-jade hover:text-white transition-colors shadow-md hover:shadow-lg dark:bg-gray-800 dark:text-pistachio dark:hover:bg-dark-jade dark:hover:text-gray-100"
            >
              {t('capabilities.viewAll')} <ArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-deep-forest text-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
          >
            {[
              { value: '13+', labelKey: 'stats.yearsExperience', icon: Star },
              { value: '500+', labelKey: 'stats.casesWon', icon: Scale },
              { value: '20+', labelKey: 'stats.expertLawyers', icon: Users },
              { value: '100%', labelKey: 'stats.clientSatisfaction', icon: Award }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/5 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-pistachio" />
                  <div className="font-serif text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">{t(stat.labelKey)}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-cream dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest mb-8 dark:text-gray-100">
                {t('whyChooseUs.title')} <span className="text-jade dark:text-pistachio">{t('whyChooseUs.brand')}</span>?
              </h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed dark:text-gray-300">
                {t('whyChooseUs.description')}
              </p>
              <ul className="space-y-6 text-lg">
                {t('whyChooseUs.items', { returnObjects: true }).map((item: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    className="flex items-start"
                  >
                    <span className="w-3 h-3 bg-jade rounded-full mr-4 mt-2 dark:bg-pistachio" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/office-interior.jpg"
                alt={t('whyChooseUs.brand')}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = '/fallback-office.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/20 to-transparent dark:from-gray-900/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dynamic */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-4">
                {t('testimonials.title', 'Client Testimonials')} {/* fallback if not in JSON */}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('testimonials.subtitle', 'Hear what our clients say about working with us.')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-cream dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-deep-forest dark:text-white">{testimonial.name}</p>
                    {testimonial.role && <p className="text-sm text-jade dark:text-pistachio">{testimonial.role}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-28 bg-gradient-to-r from-jade to-pistachio dark:from-dark-jade dark:to-gray-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8">
              {t('cta.title', 'Ready to resolve your legal matters?')}
            </h2>
            <p className="text-xl text-white/90 mb-12">
              {t('cta.subtitle', 'Schedule a confidential consultation today.')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-12 py-5 bg-deep-forest text-white font-semibold rounded-full hover:bg-white hover:text-deep-forest transition-all duration-300 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-900"
            >
              {t('cta.button', 'Contact Us Now')} <ArrowRight className="ml-3" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}