import { motion } from 'framer-motion';
import { 
  MapPin, Mail, Phone, Briefcase, Scale, Home, 
  Landmark, Award, Users, Gavel 
} from 'lucide-react';

export default function JoinUs() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const services = [
    { icon: Briefcase, text: 'Corporate Legal Support, Compliance & Risk Management' },
    { icon: Scale, text: 'Commercial Transactions & Dispute Resolution' },
    { icon: Home, text: 'Property and Real Estate Consultation & Support' },
    { icon: Landmark, text: 'Intellectual Property Law' },
    { icon: Award, text: 'Estate Planning' },
    { icon: Users, text: 'Tax Consulting and Accounts' },
    { icon: Gavel, text: 'Dispute Resolution and Litigation' },
    { icon: Users, text: 'Legal Clinics' },
  ];

  return (
    <div className="pt-24 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-deep-forest dark:bg-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-serif text-5xl md:text-6xl font-bold mb-6"
          >
            Join <span className="text-pistachio">Adansonia</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Be part of a premier legal practice dedicated to excellence, innovation, and client-centric solutions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-cream dark:from-gray-800 to-white dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16"
          >
            {/* Who We Are */}
            <motion.div variants={fadeInUp} className="max-w-4xl">
              <h2 className="font-serif text-3xl font-bold text-deep-forest dark:text-white mb-6">Who We Are</h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Kiamba Mbithi & Company Advocates was incorporated in 2013 as a corporate, commercial and conveyancing 
                  firm under the name Kiamba Mbithi and Associates Advocates. The firm later adopted the name 
                  <strong> ADANSONIA Kiamba Mbithi & Company Advocates</strong>, a joint venture meant to provide the best 
                  services in legal consulting, property acquisition and management as well as business support.
                </p>
                <p>
                  The firm is dedicated to offer timely, affordable and reliable legal services to a diverse clientele, 
                  committed to excellence and adaptive to evolving needs.
                </p>
              </div>
            </motion.div>

            {/* What We Do */}
            <motion.div variants={fadeInUp}>
              <h2 className="font-serif text-3xl font-bold text-deep-forest dark:text-white mb-8">What We Do</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start space-x-3 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                      <Icon className="h-6 w-6 text-jade dark:text-pistachio flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Our Strength */}
            <motion.div variants={fadeInUp} className="bg-pistachio/20 dark:bg-gray-700 p-10 rounded-3xl border-l-8 border-jade dark:border-pistachio">
              <h2 className="font-serif text-3xl font-bold text-deep-forest dark:text-white mb-4">Our Strength</h2>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                The firm houses a team of experienced litigators and mediators well equipped to handle complex 
                disputes and provide comprehensive legal solutions. Our strategy is built on expertise and a 
                sharp focus on meeting the evolving needs of our clientele.
              </p>
            </motion.div>

            {/* About the Lead */}
            <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-deep-forest dark:text-white mb-4">About the Lead: Victor Kiamba</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Victor Kiamba is an Advocate of the High Court of Kenya with 13 years of practice in property, 
                    corporate and commercial law. He serves as the Principal Practitioner and Consultant.
                  </p>
                  <p>
                    He has vast experience and exposure in corporate practice and governance, Property Law and Tax. 
                    Victor holds a Bachelor of Laws (LLB) from CUEA and a PGDL from the Kenya School of Law. 
                    He is presently undertaking a Master of Laws in Property Law from UNISA.
                  </p>
                </div>
                <div className="mt-6">
                  <a href="mailto:consult@adansonia.info" className="text-jade dark:text-pistachio font-bold text-lg hover:underline underline-offset-4">
                    consult@adansonia.info
                  </a>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-serif text-2xl font-bold text-deep-forest dark:text-white mb-6">Contact Details</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <MapPin className="h-6 w-6 text-jade dark:text-pistachio mr-4 flex-shrink-0" />
                    <div className="text-gray-700 dark:text-gray-300">
                      <p className="font-semibold">Nairobi Office</p>
                      <p>IHIT Centre, Dennis Pritt Road</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">B8; Starwood Apartments, Argwings Kodhek Road</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">PO Box 47290-00100, Nairobi</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 text-jade dark:text-pistachio mr-4" />
                    <a href="tel:0748364601" className="text-gray-700 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio font-medium">0748 364 601</a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 text-jade dark:text-pistachio mr-4" />
                    <a href="mailto:consult@adansonia.info" className="text-gray-700 dark:text-gray-300 hover:text-jade dark:hover:text-pistachio font-medium">consult@adansonia.info</a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-jade to-pistachio dark:from-deep-forest dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              Ready to work with us?
            </h2>
            <p className="text-white/80 mb-8 text-lg">Whether you are a potential client or a legal professional looking for a partnership, we’d love to hear from you.</p>
            <a
              href="/contact"
              className="inline-flex items-center px-10 py-4 bg-deep-forest dark:bg-pistachio text-white dark:text-deep-forest font-bold rounded-full hover:scale-105 transition-transform duration-300 text-lg shadow-2xl"
            >
              Contact Our Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}