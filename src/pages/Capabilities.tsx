import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Scale, Users, Briefcase, Award, Home, Landmark, 
  Mail, Phone, MapPin, BookOpen, Gavel, TrendingUp, ChevronDown, Handshake 
} from 'lucide-react';
import { api } from '../lib/api';

interface Capability {
  id: string;
  title: string;
  description: string;
  icon?: string;
  priority?: number;
}

export default function Capabilities() {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCapabilities()
      .then(data => {
        const sorted = data.sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0));
        setCapabilities(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (iconName?: string, size: number = 32) => {
    const icons: Record<string, JSX.Element> = {
      scale: <Scale size={size} />,
      users: <Users size={size} />,
      briefcase: <Briefcase size={size} />,
      award: <Award size={size} />,
      home: <Home size={size} />,
      landmark: <Landmark size={size} />,
      gavel: <Gavel size={size} />,
      trendingup: <TrendingUp size={size} />,
      bookopen: <BookOpen size={size} />,
      handshake: <Handshake size={size} />,
    };
    return icons[iconName?.toLowerCase() || ''] || <Briefcase size={size} />;
  };

  const caseStudies = [
    {
      title: "Multi‑million M&A Deal",
      description: "Advised on Kenya's largest telecom merger in 2024",
      icon: Briefcase,
    },
    {
      title: "Landmark Litigation Win",
      description: "Secured full dismissal in high‑profile constitutional petition",
      icon: Scale,
    },
    {
      title: "Cross‑Border JV",
      description: "Structured joint venture for international energy project",
      icon: Handshake,
    },
  ];

  const fullServices = [
    { icon: Briefcase, text: 'Corporate Legal Support, Compliance & Risk Management' },
    { icon: TrendingUp, text: 'Commercial Transactions & Dispute Resolution' },
    { icon: Home, text: 'Property and Real Estate Consultation & Support' },
    { icon: Landmark, text: 'Intellectual Property Law' },
    { icon: Award, text: 'Estate Planning' },
    { icon: Users, text: 'Tax Consulting and Accounts' },
    { icon: Gavel, text: 'Dispute Resolution and Litigation' },
    { icon: Users, text: 'Legal Clinics' },
    { icon: Scale, text: 'Conveyancing, Banking & Finance' },
    { icon: BookOpen, text: 'Mediation Services' },
  ];

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      
      {/* Immersive Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/practice-hero.jpg"
            alt="Practice Areas"
            className="w-full h-full object-cover brightness-[0.6]"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/60 via-transparent to-white dark:to-gray-900" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
            Our <span className="text-pistachio">Capabilities</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
            Specialized, strategic, and results-driven legal solutions tailored to the evolving needs of our clients.
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-white/50 flex justify-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          >
            <ChevronDown size={40} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-deep-forest dark:bg-gray-800 text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['13+', 'Years of Excellence'], ['500+', 'Matters Handled'], ['100%', 'Client Satisfaction'], ['Regional', 'East Africa Hub']].map(([stat, label]) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-bold text-pistachio font-serif">{stat}</div>
              <div className="text-xs uppercase tracking-widest mt-2 text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Mega-Tiles (Dynamic Practice Areas) */}
      <section className="py-24 bg-cream/30 dark:bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-forest dark:text-white mb-16 text-center">Expertise & Focus</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-pistachio border-t-jade rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 hover:border-jade transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-jade/0 to-pistachio/0 group-hover:from-jade/5 group-hover:to-pistachio/5 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-jade/5 dark:bg-jade/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-jade group-hover:text-white transition-colors">
                      <div className="text-jade dark:text-pistachio group-hover:text-white transition-colors">
                        {getIcon(cap.icon, 36)}
                      </div>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-4 group-hover:text-jade transition-colors">{cap.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">{cap.description}</p>
                    
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-tighter text-gray-400 mb-8">
                      <span>✓ High‑stakes</span>
                      <span>✓ 24/7 Support</span>
                    </div>

                    <Link 
                      to={`/capabilities/${cap.id}`}
                      className="inline-flex items-center text-jade dark:text-pistachio font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all"
                    >
                      Dive Deeper <ArrowRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* About the Firm & Identity */}
      <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 bg-pistachio/30 text-jade rounded-full text-sm font-bold mb-4">EST. 2013</div>
              <h2 className="font-serif text-4xl font-bold text-deep-forest dark:text-white mb-6">Firm Foundation</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                Originally incorporated in 2013, the firm later evolved into 
                <strong className="text-deep-forest dark:text-white"> ADANSONIA Kiamba Mbithi & Company Advocates</strong>. 
                This joint venture was established to provide a seamless fusion of legal consulting, 
                strategic property acquisition, and corporate business support.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-jade/10 rounded-lg"><MapPin className="text-jade" /></div>
                  <div>
                    <h4 className="font-bold dark:text-white">Nairobi Hub</h4>
                    <p className="text-sm text-gray-500">IHIT Centre, Dennis Pritt Rd</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-jade/10 rounded-lg"><Scale className="text-jade" /></div>
                  <div>
                    <h4 className="font-bold dark:text-white">Reliability</h4>
                    <p className="text-sm text-gray-500">Affordable & Timely</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-cream dark:bg-gray-800 p-8 rounded-3xl border border-jade/10"
            >
              <h3 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-6">Our Full Service Suite</h3>
              <div className="space-y-3">
                {fullServices.map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <div key={i} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 border-b border-jade/5 pb-2 last:border-0">
                      <Icon size={16} className="text-jade" />
                      <span className="text-sm font-medium">{service.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Teaser */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16 text-deep-forest dark:text-gray-100">
            Client Successes
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {caseStudies.map((story, i) => {
              const Icon = story.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 text-left"
                >
                  <Icon size={40} className="text-jade dark:text-pistachio mb-6" />
                  <h3 className="font-serif text-xl font-bold mb-4">{story.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{story.description}</p>
                  <Link to="/case-studies" className="text-jade dark:text-pistachio font-bold text-xs uppercase hover:underline">
                    Full Case Study →
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal Advocate Profile */}
      <section className="py-24 bg-deep-forest text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto lg:mx-0"
            >
              <img 
                src="/victor-kiamba.jpg" 
                alt="Victor Kiamba"
                className="rounded-3xl shadow-2xl w-full h-full object-cover z-10 relative border-8 border-white/5"
                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-jade to-pistachio rounded-3xl flex items-center justify-center text-white font-serif text-4xl shadow-2xl">
                Victor Kiamba
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-jade rounded-full -z-0 blur-2xl opacity-50" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-5xl font-bold mb-2 text-pistachio">Victor Kiamba</h2>
              <p className="text-white font-medium text-xl mb-8 opacity-80">Principal Practitioner & Consultant</p>
              
              <div className="space-y-6 text-white/80 text-lg leading-relaxed mb-10">
                <p>An Advocate of the High Court of Kenya with over 13 years of specialized practice in property, corporate, and commercial law.</p>
                <p>Victor holds a Bachelor of Laws (LLB) from CUEA and a PGDL from the Kenya School of Law, currently pursuing an LLM from UNISA.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 border-t border-white/10 pt-8">
                <a href="mailto:consult@adansonia.info" className="flex items-center hover:text-pistachio transition-colors">
                  <Mail className="mr-3 text-jade" /> consult@adansonia.info
                </a>
                <a href="tel:0748364601" className="flex items-center hover:text-pistachio transition-colors">
                  <Phone className="mr-3 text-jade" /> 0748 364 601
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white dark:bg-gray-900 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6"
        >
          <h2 className="font-serif text-4xl font-bold text-deep-forest dark:text-white mb-8">
            Specialized Advice is One Click Away
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center px-12 py-5 bg-jade text-white font-bold rounded-full hover:bg-deep-forest transition-all shadow-xl hover:shadow-jade/20"
          >
            Schedule a Consultation 
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}