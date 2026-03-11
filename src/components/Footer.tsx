import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react'; // Added ExternalLink

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3c34] dark:bg-gray-900 text-white pt-20 pb-10 border-t border-jade/20 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5">
            <h3 className="text-2xl font-bold tracking-[0.2em] text-white mb-6 uppercase">
              ADANSONIA
            </h3>
            <p className="text-pistachio font-semibold text-sm mb-6 tracking-wider uppercase">
              Kiamba Mbithi & Company Advocates
            </p>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              A premier joint venture dedicated to excellence in legal consulting, 
              property management, and corporate strategy. Established in 2013 to provide 
              adaptive solutions for a global clientele.
            </p>
            <div className="flex space-x-4">
               <span className="text-[10px] text-jade dark:text-pistachio font-bold uppercase tracking-widest px-3 py-1 border border-jade/30 dark:border-pistachio/30 rounded">
                 Nairobi, Kenya
               </span>
            </div>
          </div>

          {/* Navigation & Partners Column */}
          <div className="md:col-span-3">
            <div className="mb-10">
              <h4 className="text-jade dark:text-pistachio font-bold text-xs tracking-[0.3em] uppercase mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'People', 'Capabilities', 'Insights', 'Join Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-gray-400 dark:text-gray-500 hover:text-pistachio dark:hover:text-jade transition-colors text-sm font-medium flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-pistachio dark:bg-jade mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partners Section */}
            <div>
              <h4 className="text-jade dark:text-pistachio font-bold text-xs tracking-[0.3em] uppercase mb-6">Partners</h4>
              <ul className="space-y-4">
                <li className="flex items-center group">
                  <ExternalLink className="h-4 w-4 text-pistachio mr-3 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <a
                    href="https://capitalreturnltd.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-jade transition-colors text-sm font-medium"
                  >
                    Capital Return Ltd <span className="text-[10px] opacity-70 ml-1">(Real Estate)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-jade dark:text-pistachio font-bold text-xs tracking-[0.3em] uppercase mb-8">Head Office</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-pistachio dark:text-jade mr-4 flex-shrink-0" />
                <div className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
                  <p className="font-bold text-white dark:text-gray-100">IHIT Centre</p>
                  <p>Dennis Pritt Road, Nairobi</p>
                  <p>Office numer 6</p>
                  <p className="mt-1 text-xs italic opacity-70">P.O. Box 47290-00100, Nairobi</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-pistachio dark:text-jade mr-4 flex-shrink-0" />
                <a href="mailto:consult@adansonia.info" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-pistachio transition-colors text-sm">
                  consult@adansonia.info
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-pistachio dark:text-jade mr-4 flex-shrink-0" />
                <a href="tel:0748364601" className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-pistachio transition-colors text-sm font-bold">
                  0748 364 601
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 dark:border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 dark:text-gray-600 text-[11px] uppercase tracking-widest font-semibold">
              &copy; {currentYear} Kiamba Mbithi & Company Advocates.
            </p>
          </div>
          <div className="flex space-x-8 text-[11px] uppercase tracking-widest font-semibold">
            <Link 
              to="/privacy-policy" className="text-gray-500 dark:text-gray-600 hover:text-jade dark:hover:text-pistachio transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}