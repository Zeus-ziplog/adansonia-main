import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-jade dark:from-gray-800 dark:to-gray-900 text-white py-20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              {t('privacy.title', 'Privacy Policy')}
            </h1>
            <p className="text-xl text-emerald-100 dark:text-gray-300">
              {t('privacy.lastUpdated', 'Last updated: {{date}}', { date: currentDate })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:text-deep-forest dark:prose-headings:text-white prose-a:text-jade dark:prose-a:text-pistachio"
        >
          {/* Introduction */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.introduction.title', 'Introduction')}</h2>
            <p>{t('privacy.sections.introduction.content')}</p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.infoWeCollect.title', 'Information We Collect')}</h2>
            <p>{t('privacy.sections.infoWeCollect.intro')}</p>
            <ul>
              {t('privacy.sections.infoWeCollect.items', { returnObjects: true }).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.howWeUse.title', 'How We Use Your Information')}</h2>
            <p>{t('privacy.sections.howWeUse.intro')}</p>
            <ul>
              {t('privacy.sections.howWeUse.items', { returnObjects: true }).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Data Protection */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.dataProtection.title', 'Data Protection')}</h2>
            <p>{t('privacy.sections.dataProtection.content')}</p>
          </motion.section>

          {/* Attorney-Client Privilege */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.attorneyPrivilege.title', 'Attorney-Client Privilege')}</h2>
            <p>{t('privacy.sections.attorneyPrivilege.content')}</p>
          </motion.section>

          {/* Information Sharing */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.infoSharing.title', 'Information Sharing')}</h2>
            <p>{t('privacy.sections.infoSharing.intro')}</p>
            <ul>
              {t('privacy.sections.infoSharing.items', { returnObjects: true }).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Cookies and Tracking */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.cookies.title', 'Cookies and Tracking')}</h2>
            <p>{t('privacy.sections.cookies.content')}</p>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.yourRights.title', 'Your Rights')}</h2>
            <p>{t('privacy.sections.yourRights.intro')}</p>
            <ul>
              {t('privacy.sections.yourRights.items', { returnObjects: true }).map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.section>

          {/* Third-Party Links */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.thirdParty.title', 'Third-Party Links')}</h2>
            <p>{t('privacy.sections.thirdParty.content')}</p>
          </motion.section>

          {/* Changes to This Policy */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.changes.title', 'Changes to This Policy')}</h2>
            <p>{t('privacy.sections.changes.content')}</p>
          </motion.section>

          {/* Contact Us */}
          <motion.section variants={fadeInUp}>
            <h2>{t('privacy.sections.contact.title', 'Contact Us')}</h2>
            <p>{t('privacy.sections.contact.content')}</p>
            <div className="not-prose mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail size={20} className="text-jade dark:text-pistachio" />
                <a href={`mailto:${t('privacy.contactDetails.email')}`} className="hover:text-jade dark:hover:text-pistachio">
                  {t('privacy.contactDetails.email')}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Phone size={20} className="text-jade dark:text-pistachio" />
                <a href={`tel:${t('privacy.contactDetails.phone').replace(/\s/g, '')}`} className="hover:text-jade dark:hover:text-pistachio">
                  {t('privacy.contactDetails.phone')}
                </a>
              </div>
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <MapPin size={20} className="text-jade dark:text-pistachio flex-shrink-0 mt-1" />
                <span>{t('privacy.contactDetails.address')}</span>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}