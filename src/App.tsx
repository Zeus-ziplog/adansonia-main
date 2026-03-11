import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import People from "./pages/People";
import Capabilities from "./pages/Capabilities";
import Insights from "./pages/Insights";
import JoinUs from "./pages/JoinUs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingAssistant from "./components/FloatingAssistant";
import CapabilityDetail from './pages/CapabilityDetail';
import CaseStudies from './pages/CaseStudies';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import ScrollToTop from './components/ScrollToTop';
import Toaster from 'react-hot-toast';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people" element={<People />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/capabilities/:id" element={<CapabilityDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
      <CookieConsent />
      <FloatingAssistant />
      <Footer />
    </Router>
  );
}

export default App;